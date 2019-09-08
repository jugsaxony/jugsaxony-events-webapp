import { Component, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { EventData } from '../../core/data';

@Component({
    templateUrl: 'event-facts.component.html',
    selector: 'jug-event-facts',
    animations: [
        trigger('registrationState', [
            state('in', style({ transform: 'translateX(0)' })),
            transition('void => *', [
                style({ transform: 'translateX(-100%)' }),
                animate(200)
            ]),
            transition('* => void', [
                animate(200, style({ transform: 'translateX(100%)' }))
            ])
        ])
    ]
})
export class EventFactsComponent {

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
