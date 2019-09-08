import { Component, Input } from '@angular/core';
import { JobOfferEntity } from '../../core/entities';

@Component({
    selector: 'job-offer-card',
    templateUrl: 'job-offer-card.component.html'
})
export class JobOfferCardComponent {

    @Input() 
    public jobOffer: JobOfferEntity;
}
