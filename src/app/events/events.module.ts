import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DatePipe } from '@angular/common';

import { SharedModule } from "../shared/shared.module";
import { EventListPage, EventDetailsPage } from './pages';
import { EventCardComponent, EventFactsComponent, WantedCardComponent } from "./components";
import * as fromEvents from './events.reducers';
import { EventListEffects, EventDetailsEffects } from './effects';

const PAGES = [
  EventListPage,
  EventDetailsPage
];

const COMPONENTS = [
  EventCardComponent,
  EventFactsComponent,
  WantedCardComponent
];

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature('events', fromEvents.reducers),
    EffectsModule.forFeature([EventListEffects, EventDetailsEffects])
  ],
  declarations: [
    ...PAGES,
    ...COMPONENTS
  ],
  providers: [DatePipe],
  entryComponents: PAGES
})
export class EventsModule { }
