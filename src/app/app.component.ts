import { Component } from '@angular/core';
import { Platform, App } from 'ionic-angular';
import { Store } from '@ngrx/store';

import { environment } from './util/environment';
import { PWAService } from './core/services';
import { COLORS } from './app.colors';
import * as fromApp from './app.reducers';
import * as appActions from './app.actions';
import * as eventListActions from './events/actions/event-list.actions'

@Component({
  template: '<core-container></core-container>'
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private app: App,
    private pwaService: PWAService,
    private store: Store<fromApp.State>,
  ) {
    platform.ready().then(() => this.onAppReady());
  }

  private onAppReady(): void {
    console.log("App ready", environment.name);

    this.app.viewDidEnter.subscribe(viewController => {
      if (!viewController.isOverlay) {
        this.store.dispatch(new appActions.ChangePage(viewController.component));
      }
    });

    this.pwaService.initServiceWorkerRegistration();

    document.addEventListener("visibilitychange", e => this.handleVisibilityChange(e), false);
    window.addEventListener('online',  e => this.handleOnlineStateChange(e));
    window.addEventListener('offline', e => this.handleOnlineStateChange(e));

    this.store.dispatch(new appActions.OnlineStateChange(navigator.onLine));
    this.store.dispatch(new appActions.ClientConfiguration());

    if (this.pwaService.isIOSHomescreenMode()) {
      this.platform.platforms().push('standalone');
      // im iOS-Standalone-Mode ist die APP sonst um 20px zu weit oben platziert
      const iosViewport = 'viewport-fit=auto, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no';
      this.pwaService.setViewportMetaAttribute(iosViewport);
      this.pwaService.addIonAppClass('standalone');
      this.pwaService.changeThemeColor(COLORS.theme);
    }
    if (this.pwaService.isIPhoneXPortraitMode()) {
      this.pwaService.addIonAppClass('iphonex');
    }
    if (navigator.userAgent && /windows/.test(navigator.userAgent.toLowerCase()) && !this.platform.is('windows')) {
      this.platform.platforms().push('windows');
    }
  }

  private handleVisibilityChange(event: any): void {
    if (!document.hidden) {
      // die App wurde in den Vordergrund geholt
      this.store.dispatch(new appActions.ClientConfiguration());
      this.store.dispatch(new eventListActions.RefreshIfPageVisible());
      this.pwaService.updateServiceWorker();
    }
  }

  private handleOnlineStateChange(event: any): void {
    this.store.dispatch(new appActions.OnlineStateChange(navigator.onLine));
  }
}
