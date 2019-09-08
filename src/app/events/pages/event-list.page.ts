import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { NavController, ActionSheetController, ActionSheet, ActionSheetButton, Content, Platform } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { getEventListEventDataListState, getEventListShowCurrentOrFutureEventsState, getEventListLoadingState } from '../events.selectors';
import * as fromEventList from '../reducers/event-list.reducers';
import * as eventListActions from '../actions/event-list.actions';
import { EventData } from '../../core/data';

@Component({
  selector: 'page-event-list',
  templateUrl: 'event-list.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventListPage {

  public eventDataList$: Observable<EventData[]>;
  public showCurrentOrFuture$: Observable<boolean>;
  public loading$: Observable<boolean>;

  @ViewChild(Content)
  private content: Content;

  private actionSheet: ActionSheet;
  
  constructor(
    private store: Store<fromEventList.State>,
    private navController: NavController,
    private platform: Platform,
    private actionSheetController: ActionSheetController) {
      this.eventDataList$ = store.select(getEventListEventDataListState);
      this.showCurrentOrFuture$ = store.select(getEventListShowCurrentOrFutureEventsState);
      this.loading$ = store.select(getEventListLoadingState);
  }

  ionViewDidEnter(): void {
    this.refreshEvents();
  }

  ionViewDidLeave(): void {
    if (this.actionSheet) {
      this.actionSheet.dismiss();
      this.actionSheet = null;
    }
  }

  public toggleShowCurrrentEvents(): void {
    this.scrollToTop();
    this.store.dispatch(new eventListActions.TogglePresentPast());
  }

  public showDetail(eventData: EventData) {
    this.store.dispatch(new eventListActions.OpenDetailPage(eventData.entity.id, this.navController));
  }

  public showActionSheet(eventData: EventData, event: string) {
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
    }
    if (buttons.length === 0) {
      return;
    }
    this.actionSheet = this.actionSheetController.create({
      title: eventData.entity.title,
      buttons: [...buttons, {
        text: 'Abbrechen',
        role: 'cancel',
      }]
    });
    this.actionSheet.present();
  }

  public scrollToTop() {
    this.content.scrollToTop();
  }

  private refreshEvents(): void {
    this.store.dispatch(new eventListActions.Refresh());
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
}
