import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

import { RemoteEventsService } from "./remote-events.service";
import { EventRegistrationService } from "./event-registration.service";
import { EventData, RegistrationTokenMap } from "../data";
import { timeDistance, atMidnight, toUTCTimeString, toLocalTimeString } from '../functions/date-functions';
import { EventEntity, EventId, RegistrationToken } from '../entities';
import { environment } from '../../util/environment';

@Injectable()
export class EventDataService {

    readonly API_ROOT: string;

    private eventEntityCache: EventEntity[] = [];

    constructor(
        private remoteEventsService: RemoteEventsService,
        private eventRegistrationService: EventRegistrationService
    ) {
        this.API_ROOT = environment.apiRoot;
    }

    public getEventList(): Observable<EventData[]> {
        if (navigator.onLine) {
            return Observable
                .zip(this.remoteEventsService.getEvents(), this.eventRegistrationService.getRegistrationTokens())
                .do(([events, tokens]) => this.eventEntityCache = events)
                .map(([events, tokens]) => this.createEventDataList(events, tokens))
        } else {
            console.log("Using offline data", this.eventEntityCache);
            return Observable
                .zip(Observable.of(this.eventEntityCache), this.eventRegistrationService.getRegistrationTokens())
                .map(([events, tokens]) => this.createEventDataList(events, tokens))
        }
    }

    public getEvent(eventId: EventId): Observable<EventData> {
        const startOfDay: Date = atMidnight(new Date());
        if (navigator.onLine) {
            return Observable
                .zip(this.remoteEventsService.getEvent(eventId), this.eventRegistrationService.getRegistrationToken(eventId))
                .map(([event, token]) => this.createEventData(event, token, startOfDay))
        } else {
            const eventEntiy: EventEntity = this.eventEntityCache.find(i => i.id === eventId);
            if (!eventEntiy) {
                return Observable.throw(new Error('Du bist leider offline. Die Veranstaltung kann momentan nicht geladen werden.'));
            }
            console.log("Using offline data", eventEntiy);
            return Observable
                .zip(Observable.of(eventEntiy), this.eventRegistrationService.getRegistrationToken(eventId))
                .map(([event, token]) => this.createEventData(event, token, startOfDay))
        }
    }

    private createEventDataList(entities: EventEntity[], tokens: RegistrationTokenMap): EventData[] {
        const startOfDay: Date = atMidnight(new Date());
        return entities.map(i => this.createEventData(i, tokens[i.id], startOfDay));
    }

    private createEventData(entity: EventEntity, token: RegistrationToken, startOfDay: Date): EventData {
        let url = `https://jugsaxony.org/veranstaltungen/${entity.id}/`;
        let startTime = toLocalTimeString(entity.startTime); //20171130T1600
        let startTimeZ = toUTCTimeString(entity.startTime); //20171130T1400Z
        let endTime = toLocalTimeString(entity.endTime);
        let endTimeZ = toUTCTimeString(entity.endTime);
        let subject = encodeURIComponent(entity.title);
        let address = encodeURIComponent(entity.address);
        let description = encodeURIComponent(`JUG Saxony: ${entity.title}\nSprecher: ${entity.speaker}\nOrt: ${entity.site}`);
        return {
            entity: entity,
            registration: token,
            dateDistance: timeDistance(entity.startTime),
            currentOrFuture: entity.startTime >= startOfDay,
            googleMapsUrl: "https://maps.google.com/?q=" + encodeURIComponent(entity.address),
            bingMapsUrl: "bingmaps:?q=" + encodeURIComponent(entity.address),
            appleMapsUrl: "http://maps.apple.com/?q=" + encodeURIComponent(entity.address),
            icsDownloadUrl: `${this.API_ROOT}/events/${entity.id}.ics`,
            // aCalendar hat Schwierigkeiten mit UTC-Zeiten via calShare
            calShareUrl: `https://calshare.de/${startTime}/${endTime}/${subject}/${address}/${description}`,
            googleCalendarUrl: `https://www.google.com/calendar/render?action=TEMPLATE&text=${subject}&dates=${startTimeZ}/${endTimeZ}&location=${address}&details=${description}&sprop=name:Veranstaltung&sprop=website:${url}&sf=true&output=xml`
        };
    }
}
