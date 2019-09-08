import { createSelector, createFeatureSelector, } from '@ngrx/store';

import * as fromApp from '../app.reducers';
import * as fromEvents from './events.reducers';
import * as fromEventList from './reducers/event-list.reducers';
import * as fromEventDetails from './reducers/event-details.reducers';

import { EventData } from '../core/data';

export const getEventsState = createFeatureSelector<fromApp.State>('events');

export const getEventListState = createSelector(getEventsState, fromEvents.getList);

export const getEventListShowCurrentOrFutureEventsState = createSelector(getEventListState, fromEventList.getShowCurrentOrFutureEvents);

export const getEventListLoadingState = createSelector(getEventListState, fromEventList.getLoading);

export const getEventListFutureEventsState = createSelector(getEventListState, fromEventList.getFutureEvents);

export const getEventListPastEventsState = createSelector(getEventListState, fromEventList.getPastEvents);

export const getEventListEventDataListState = createSelector(
    getEventListShowCurrentOrFutureEventsState, getEventListFutureEventsState, getEventListPastEventsState,
    (showFuture: boolean, futureEvents: EventData[], pastEvents: EventData[]) => showFuture ? futureEvents : pastEvents);

export const getEventDetailsState = createSelector(getEventsState, fromEvents.getDetails);

export const getEventDetailsEventDataState = createSelector(getEventDetailsState, fromEventDetails.getEventData);

export const getEventDetailsRegistrationDataState = createSelector(getEventDetailsState, fromEventDetails.getRegistrationData);

export const getEventDetailsRegistrationPossibleState = createSelector(getEventDetailsState, fromEventDetails.getRegistrationPossible);

export const getEventDetailsShowHeaderRegistrationButtonState = createSelector(getEventDetailsState, fromEventDetails.getShowHeaderRegistrationButton);

export const getEventDetailsPendingFabActionState = createSelector(getEventDetailsState, fromEventDetails.getPendingFabAction);

export const getEventDetailsLoadingState = createSelector(getEventDetailsState, fromEventDetails.getLoading);
