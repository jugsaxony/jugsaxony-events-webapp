import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { Store } from '@ngrx/store';

import * as fromApp from '../../app.reducers';
import { Observable } from 'rxjs/Observable';
import { getAppOfflineState, getAppUpdateAvailableState, getAppConfigurationState } from '../../app.selectors';
import { ClientConfigurationEntity } from '../../core/entities';
import { PWAService } from '../../core/services';

@Component({
    templateUrl: 'app-state.component.html',
    selector: 'jug-app-state',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppStateComponent {

    public offline$: Observable<boolean>;
    public updateAvailable$: Observable<boolean>;
    public configuration$: Observable<ClientConfigurationEntity>;

    readonly changelogUrl = 'https://github.com/jugsaxony/jugsaxony-events-webapp/blob/master/CHANGELOG.md';

    constructor(
        store: Store<fromApp.State>,
        private alert: AlertController,
        private pwaService: PWAService
    ) {
        this.offline$ = store.select(getAppOfflineState);
        this.updateAvailable$ = store.select(getAppUpdateAvailableState);
        this.configuration$ = store.select(getAppConfigurationState);
    }

    public async showUpdateDialog(): Promise<any> {
        const configuration = await this.configuration$.take(1).toPromise();
        const alert = this.alert.create({
            title: 'Update verfügbar',
            subTitle: `Die Version ${configuration.version} steht nun für Dich zur Verfügung.`
        });
        alert.addButton({
            text: 'Änderungen ansehen',
            handler: data => {
                this.pwaService.openExternalPage(this.changelogUrl);
            }
        });
        alert.addButton({
            text: 'Neu laden',
            cssClass: 'ok-button',
            handler: data => {
                this.pwaService.reloadApp();
            }
        });
        return alert.present();
    }
}
