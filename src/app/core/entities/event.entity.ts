import { MediaEntity } from '.';

export type EventId = string;

export class EventEntity {
    id: EventId;
    title: string;
    speaker: string;
    description: string;
    address: string;
    site: string;
    startTime: Date;
    endTime: Date;
    type: string;
    hint: string;
    imageUrl: string;
    cancelled: boolean;
    locationUrl: string;
    mapsmeUrl: string;
    herewegoUrl: string;
    media?: MediaEntity[]
}
