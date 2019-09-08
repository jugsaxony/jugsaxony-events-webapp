import { EventData } from '../data';

export function byStartTimeAsc(a: EventData, b: EventData): number {
    return compareDate(a.entity.startTime, b.entity.startTime);
}

export function byStartTimeDesc(a: EventData, b: EventData): number {
    return compareDate(b.entity.startTime, a.entity.startTime);
}

function compareDate(a: Date, b: Date): number {
    return a.getTime() - b.getTime();
}
