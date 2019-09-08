import { EventEntity, RegistrationToken } from "../entities";

export class EventData {
    entity: EventEntity;
    registration: RegistrationToken;
    dateDistance: string;
    currentOrFuture: boolean;
    googleMapsUrl: string;
    bingMapsUrl: string;
    appleMapsUrl: string;
    calShareUrl: string;
    googleCalendarUrl: string;
    icsDownloadUrl: string;
}
