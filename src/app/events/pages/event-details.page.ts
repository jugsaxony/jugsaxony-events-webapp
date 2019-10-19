import { Component, Renderer, ViewChild, NgZone, ChangeDetectionStrategy } from '@angular/core';
import { FabButton, NavParams, AlertController, Alert, ActionSheetController, ActionSheet, ActionSheetButton, Platform } from 'ionic-angular';
import { DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { EventData, RegistrationData } from "../../core/data";

import { getEventDetailsEventDataState, getEventDetailsRegistrationPossibleState, getEventDetailsShowHeaderRegistrationButtonState, getEventDetailsRegistrationDataState, getEventDetailsPendingFabActionState, getEventDetailsLoadingState } from '../events.selectors';
import * as fromEventDetails from '../reducers/event-details.reducers';
import * as eventDetailsActions from '../actions/event-details.actions';
import { PWAService } from '../../core/services';

@Component({
  selector: 'page-event-details',
  templateUrl: 'event-details.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventDetailsPage {

  public eventData$: Observable<EventData>;
  public registrationPossible$: Observable<boolean>;
  public showHeaderRegistrationButton$: Observable<boolean>;
  public pendingFabAction$: Observable<boolean>;
  public loading$: Observable<boolean>;

  @ViewChild('floatingRegistrationButton')
  private floatingRegistrationButton: FabButton;
  private dialog: Alert;
  private actionSheet: ActionSheet;

  private registrationData$: Observable<RegistrationData>;

  private dialogInputs: InputEntry[] = [
    { key: 'firstName', label: 'Vorname', type: 'text' },
    { key: 'lastName', label: 'Nachname', type: 'text' },
    { key: 'company', label: 'Unternehmen / Hochschule', type: 'text' },
    { key: 'emailAddress', label: 'Email-Adresse', type: 'email' }
  ];

  constructor(
    private ngZone: NgZone,
    private navParams: NavParams,
    private store: Store<fromEventDetails.State>,
    private platform: Platform,
    private actionSheetController: ActionSheetController,
    private alert: AlertController,
    private datePipe: DatePipe,
    private pwaService: PWAService) {
    this.eventData$ = store.select(getEventDetailsEventDataState);
    this.registrationPossible$ = store.select(getEventDetailsRegistrationPossibleState);
    this.showHeaderRegistrationButton$ = store.select(getEventDetailsShowHeaderRegistrationButtonState);
    this.registrationData$ = store.select(getEventDetailsRegistrationDataState);
    this.pendingFabAction$ = store.select(getEventDetailsPendingFabActionState);
    this.loading$ = store.select(getEventDetailsLoadingState);
    this.store.dispatch(new eventDetailsActions.RetrieveRegistrationData());
  }

  ionViewWillEnter(): void {
    let id = this.navParams.data.id;
    this.store.dispatch(new eventDetailsActions.Load(id));
  }

  ionViewCanLeave() {
    if (this.dialog) {
      this.dialog.dismiss(this.dialog.instance.getValues());
      this.dialog = null;
      // nur die Alert-Box schließen, nicht die Page verlassen
      return false;
    } else if (this.actionSheet) {
      this.actionSheet.dismiss();
      this.actionSheet = null;
      // nur das ActionSheet schließen, nicht die Page verlassen
      return false;
    }
    return true;
  }

  ionViewDidLeave() {
    if (this.dialog) {
      this.dialog.dismiss(this.dialog.instance.getValues());
      this.dialog = null;
    }
    this.store.dispatch(new eventDetailsActions.Leave());
  }

  public contentScrollHandler(event) {
    if (!this.floatingRegistrationButton) {
      return;
    }
    this.ngZone.run(() => this.store.dispatch(
      new eventDetailsActions.ToggleShowHeaderRegistrationButton(
        this.floatingRegistrationButton.getNativeElement().getBoundingClientRect().y < 0)));
  }

  public async showSignUpDialog(clickEvent?: any) {
    clickEvent && clickEvent.stopPropagation();
    this.pwaService.dismissCurrentToast();
    const eventData = await this.eventData$.take(1).toPromise();
    const registrationData = await this.registrationData$.take(1).toPromise();
    const dialog = this.alert.create();
    dialog.setCssClass("page-event-details");
    dialog.setTitle('Anmeldung');
    this.dialogInputs.forEach(i => dialog.addInput({
      id: i.key + 'Input',
      name: i.key,
      placeholder: i.label,
      type: i.type,
      value: registrationData[i.key]
    }));
    dialog.addButton('Abbrechen');
    dialog.addButton({
      text: 'OK',
      cssClass: 'ok-button',
      handler: data => {
        const registrationData = this.trimInput(data);
        if (this.validateSignUpData(dialog)) {
          this.store.dispatch(new eventDetailsActions.PerformRegistration(eventData.entity.id, registrationData));
        } else {
          this.store.dispatch(new eventDetailsActions.StoreRegistrationData(registrationData));
          // den Dialog offen behalten
          return false;
        }
      }
    });
    dialog.onWillDismiss((data) => {
      const registrationData = this.trimInput(data);
      this.store.dispatch(new eventDetailsActions.StoreRegistrationData(registrationData));
    });
    dialog.onDidDismiss(() => this.dialog = null);
    dialog.present();
    this.dialog = dialog;
  }

  public async showSignOutSheet() {
    this.pwaService.dismissCurrentToast();
    const eventData = await this.eventData$.take(1).toPromise();
    const signOutSheet = this.actionSheetController.create({
      title: eventData.entity.title,
      buttons: [{
        text: 'Ich möchte mich wieder abmelden',
        icon: 'log-out',
        handler: () => {
          this.store.dispatch(new eventDetailsActions.PerformUnregistration(eventData.entity.id));
        }
      }, {
        text: 'Abbrechen',
        role: 'cancel',
      }]
    });
    signOutSheet.present();
    signOutSheet.onDidDismiss(() => this.actionSheet = null)
    this.actionSheet = signOutSheet;
  }

  public async showActionSheet(eventData: EventData, event: string) {
    this.pwaService.dismissCurrentToast();
    let buttons: ActionSheetButton[] = [];
    if (event === 'location') {
      this.pushAction(buttons, 'In Google Maps anzeigen', 'pin', eventData.googleMapsUrl);
      if (this.platform.is('windows')) {
        this.pushAction(buttons, 'In Bing Maps anzeigen', 'logo-windows', eventData.bingMapsUrl, '_self');
      }
      const herewgoTarget = this.platform.is('core') ? null : '_self';
      this.pushAction(buttons, 'In HERE WeGo anzeigen', 'arrow-dropdown', eventData.entity.herewegoUrl, herewgoTarget);
      if (this.platform.is('ios') || this.platform.is('android')) {
        this.pushAction(buttons, 'In MAPS.ME anzeigen', 'briefcase', eventData.entity.mapsmeUrl, '_self');
      }
      if (this.platform.is('ios')) {
        this.pushAction(buttons, 'In Apple Maps anzeigen', 'logo-apple', eventData.appleMapsUrl, '_self');
      }
      this.pushAction(buttons, 'Details zum Ort anzeigen', 'map', eventData.entity.locationUrl);
    } else if (event === 'time') {
      this.pushAction(buttons, 'Zu Google Calendar hinzufügen', 'logo-google', eventData.googleCalendarUrl);
      if (this.platform.is('android')) {
        this.pushAction(buttons, 'In CalShare/aCalendar öffnen', 'calendar', eventData.calShareUrl);
      }
      this.pushAction(buttons, 'Termin als ICS-Datei herunterladen', 'download', eventData.icsDownloadUrl, '_self');
    } else if (event === 'event' && eventData.currentOrFuture) {
      const registrationPossible = await this.registrationPossible$.take(1).toPromise();
      if (registrationPossible) {
        this.pushRegistrationAction(buttons, eventData);
      }
      if ('share' in navigator) {
        this.pushShareAction(buttons, eventData);
      }
    }
    if (buttons.length === 0) {
      return;
    }
    const actionSheet = this.actionSheetController.create({
      title: eventData.entity.title,
      buttons: [...buttons, {
        text: 'Abbrechen',
        role: 'cancel',
      }]
    });
    this.actionSheet = actionSheet;
    actionSheet.onDidDismiss(() => this.actionSheet = null);
    actionSheet.present();
  }

  private pushAction(buttons: ActionSheetButton[], title: string, icon: string, url: string, target?: string): void {
    if (url) {
      buttons.push({
        text: title,
        icon: icon,
        handler: () => {
          let navTransition = this.actionSheet.dismiss();
          if (target) {
            window.open(url, target)
          } else {
            window.open(url)
          }
          navTransition.then(() => this.actionSheet = null);
          return false;
        }
      });
    }
  }

  private pushRegistrationAction(buttons: ActionSheetButton[], eventData: EventData): void {
    if (eventData.registration) {
      buttons.push({
        text: 'Abmelden',
        icon: 'log-out',
        handler: () => {
          let navTransition = this.actionSheet.dismiss();
          this.store.dispatch(new eventDetailsActions.PerformUnregistration(eventData.entity.id));
          navTransition.then(() => this.actionSheet = null);
          return false;
        }
      });
    } else {
      buttons.push({
        text: 'Anmelden',
        icon: 'log-in',
        handler: () => {
          let navTransition = this.actionSheet.dismiss();
          this.showSignUpDialog();
          navTransition.then(() => this.actionSheet = null);
          return false;
        }
      });
    }
  }

  private pushShareAction(buttons: ActionSheetButton[], eventData: EventData): void {
    buttons.push({
      text: 'Mit anderen teilen',
      icon: 'share',
      handler: () => {
        let navTransition = this.actionSheet.dismiss();
        let nav: any = navigator;
        let dateString = this.datePipe.transform(eventData.entity.startTime, "EEEE, dd. MMM y HH:mm");
        let entity = eventData.entity;
        let text = `JUG Saxony: ${entity.title},\n${entity.speaker},\n${dateString},\n${entity.site}, ${entity.address}\n`;
        let url = `https://jugsaxony.org/veranstaltungen/${entity.id}/`;
        nav.share({
          title: entity.title,
          text: text,
          url: url
        });
        navTransition.then(() => this.actionSheet = null);
        return false;
      }
    });
  }

  private validateSignUpData(alertDialog: Alert): boolean {
    let renderer: Renderer = alertDialog.instance._renderer;
    let emailAddressInput: HTMLInputElement = renderer.selectRootElement('#emailAddressInput');
    let emailAddressValue = emailAddressInput.value;
    if (/^.+@.+\..+$/.test(emailAddressValue)) {
      emailAddressInput.classList.remove("invalid");
      return true;
    } else {
      emailAddressInput.classList.add("invalid");
      setTimeout(() => emailAddressInput.scrollIntoView());
      return false;
    }
  }

  private trimInput(data: any): RegistrationData {
    return {
      firstName: (data.firstName || '').trim(),
      lastName: (data.lastName || '').trim(),
      company: (data.company || '').trim(),
      emailAddress: (data.emailAddress || '').trim()
    }
  }
}

class InputEntry {
  key: string;
  label: string;
  type: string;
}
