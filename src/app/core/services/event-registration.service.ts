import { Storage } from '@ionic/storage';
import { Injectable } from "@angular/core";

import { RegistrationToken, EventId } from '../entities';
import { RegistrationData, RegistrationTokenMap } from '../data';

@Injectable()
export class EventRegistrationService {

    constructor(
        private storage: Storage
    ) { }

    public getRegistrationTokens(): Promise<RegistrationTokenMap> {
        const result: RegistrationTokenMap = {};
        return this.storage.forEach((v, k) => {
            if (k => k.startsWith('jugsaxony-events/events/') && k.endsWith('/registration')) {
                const id: string = k.split('/')[2];
                result[id] = v;
            }
        }).then(() => result);
    }

    public getRegistrationToken(id: EventId): Promise<RegistrationToken> {
        return this.storage.get(`jugsaxony-events/events/${id}/registration`)
            .catch(error => {
                console.error('Das Registration-Token kann nicht aus dem Local-Storage ausgelesen werden', error);
                return null;
            });
    }

    public setRegistrationToken(id: EventId, token: RegistrationToken): Promise<void> {
        return this.storage.set(`jugsaxony-events/events/${id}/registration`, token)
            .catch(error => {
                console.error('Das Registration-Token kann nicht im Local-Storage gespeichert werden', error);
                return null;
            });
    }

    public removeRegistrationToken(id: EventId): Promise<void> {
        return this.storage.remove(`jugsaxony-events/events/${id}/registration`)
            .catch(error => {
                console.error('Das Registration-Token kann nicht aus dem Local-Storage gelöscht werden', error);
                return null;
            });
    }

    public getRegistrationData(): Promise<RegistrationData> {
        return this.storage.get('jugsaxony-events/registration-data')
            .catch(error => {
                console.error('Die Registration-Daten können nicht aus dem Local-Storage ausgelesen werden', error);
                return null;
            });
    }

    public setRegistrationData(data: RegistrationData): Promise<RegistrationData> {
        return this.storage.set('jugsaxony-events/registration-data', data)
            .then(() => data)
            .catch(error => {
                console.error('Die Registration-Daten können nicht im Local-Storage gespeichert werden', error);
                return null;
            });
    }
}
