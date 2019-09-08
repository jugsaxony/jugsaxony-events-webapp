import { Injectable } from '@angular/core';
import { ToastController, Toast, ToastOptions, Platform } from 'ionic-angular';

import { COLORS } from '../../app.colors';

@Injectable()
export class PWAService {

    private navigator: any = window.navigator;

    private metaElements: { [key: string]: Element; } = {};

    private currentToast: Toast;

    private serviceWorkerRegistration: ServiceWorkerRegistration;

    constructor(
        private platform: Platform,
        private toastController: ToastController
    ) { }

    public initServiceWorkerRegistration(): void {
        navigator.serviceWorker && navigator.serviceWorker.ready.then(registration => this.serviceWorkerRegistration = registration);
    }

    public updateServiceWorker(): void {
        if (!this.serviceWorkerRegistration) {
            return;
        }
        this.serviceWorkerRegistration.update();
    }

    public changeThemeColor(newColor: any): void {
        if (this.platform.is('ios') && this.platform.is('standalone')) {
            // iOS im Standalone-Modus steuert die Farbe der Statusleiste über die Body-Hintergrundfarbe
            document.body.style.backgroundColor = newColor.darker;
        } else {
            const name = 'theme-color';
            let themeColorElement = this.mapMetaElement(name) ? this.metaElements[name] : this.createMetaElement(name);
            themeColorElement.setAttribute('content', newColor.normal);
        }
    }

    public addIonAppClass(clazz: string): void {
        document.querySelector('ion-app').classList.add(clazz);
    }

    public createHttpErrorToast(value: any): Toast {
        this.changeThemeColor(COLORS.error);
        let message = !value.status || value.status === 500 ? value.message : value.error
        return this.createErrorToast({ message: message });
    }

    public setViewportMetaAttribute(value: string): void {
        document.querySelector('meta[name=viewport]').setAttribute('content', value);
    }

    public isIOSHomescreenMode(): boolean {
        return this.navigator.standalone && this.platform.is('ios');
    }

    public isIPhoneXPortraitMode(): boolean {
        const resolutions : string[] = ['2436x1125', '2436x1125', '2688x1242', '1792x828'];
        var ratio = window.devicePixelRatio || 1;
        var screen = {
            width: window.screen.width * ratio,
            height: window.screen.height * ratio
        };
        var currentResolution = `${screen.height}x${screen.width}`;
        return this.platform.is('ios') && currentResolution in resolutions;
    }

    public createErrorToast(value: any): Toast {
        const options: ToastOptions = {
            showCloseButton: true,
            cssClass: 'danger',
            position: 'bottom',
            dismissOnPageChange: true,
            ...value
        };
        const res = this.toastController.create(options);
        const originalPresent = res.present;
        const that = this;
        res.present = function () {
            that.currentToast = res;
            that.changeThemeColor(COLORS.error);
            return originalPresent.apply(this, arguments);
        }
        res.onDidDismiss(() => {
            this.changeThemeColor(COLORS.theme);
            this.currentToast = null;
        });
        return res;
    }

    public createInfoToast(value: any): Toast {
        const options: ToastOptions = {
            showCloseButton: true,
            duration: 10000,
            position: 'bottom',
            dismissOnPageChange: true,
            ...value
        };
        const res = this.toastController.create(options);
        const originalPresent = res.present;
        const that = this;
        res.present = function () {
            that.currentToast = res;
            that.changeThemeColor(COLORS.primary);
            return originalPresent.apply(this, arguments);
        }
        res.onDidDismiss(() => {
            this.changeThemeColor(COLORS.theme);
            this.currentToast = null;
        });
        return res;
    }

    public dismissCurrentToast(): void {
        const toast = this.currentToast;
        if (toast) {
            toast.dismiss();
        }
    }

    public reloadApp(): void {
        if (this.serviceWorkerRegistration && this.serviceWorkerRegistration.active && this.serviceWorkerRegistration.waiting) {
            // Chrome: wir versuchen ein Upgrade des Service Workers
            const waitingSW: ServiceWorker = this.serviceWorkerRegistration.waiting;
            var refreshing;
            navigator.serviceWorker.addEventListener('controllerchange', function () {
                if (!refreshing) {
                    refreshing = true;
                    window.location.reload();
                }
            });
            console.info('Posting "skipWaiting to"', waitingSW);
            waitingSW.postMessage({ action: 'skipWaiting' });
        } else {
            // iOS: wir laden einfach die Seite neu
            window.document.location.reload();
        }
    }

    public openExternalPage(location: string): void {
        window.open(location, '_blank');
    }

    private mapMetaElement(name: string): boolean {
        if (this.metaElements[name]) {
            return true
        }
        let filterFun = n => n instanceof Element && n.tagName === 'META' && n.getAttribute('name') === name;
        let elements = [].slice.call(document.head.childNodes).filter(filterFun);
        if (elements.length > 0) {
            this.metaElements[name] = elements[0];
            return true;
        }
        return false;
    }

    private createMetaElement(name: string): Element {
        let result = document.createElement('META');
        result.setAttribute('name', name);
        result.setAttribute('content', '');
        document.head.appendChild(result);
        this.metaElements[name] = result;
        return result;
    }
}
