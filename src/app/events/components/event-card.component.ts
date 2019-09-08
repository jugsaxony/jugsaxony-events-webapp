import { Component, Input, Output, EventEmitter } from '@angular/core';

import { EventData } from '../../core/data';

@Component({
    templateUrl: 'event-card.component.html',
    selector: 'jug-event-card',
})
export class EventCardComponent {

    @Input()
    public eventData: EventData;

    @Output()
    private cardClick: EventEmitter<string> = new EventEmitter();

    @Output()
    private detailsClick: EventEmitter<string> = new EventEmitter();

    public onCardClick(location: string): void {
        this.cardClick.emit(location);
    }

    public onDetailsClick(location: string): void {
        this.detailsClick.emit(location);
    }
}
