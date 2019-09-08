import * as fromApp from '../app.reducers';
import * as fromEventList from './reducers/event-list.reducers';
import * as fromEventDetails from './reducers/event-details.reducers';

export class EventsState {
    list: fromEventList.State;
    details: fromEventDetails.State;
}

export interface State extends fromApp.State {
    'events': EventsState;
}

export const reducers = {
    list: fromEventList.reducer,
    details: fromEventDetails.reducer
};

export const getList = (state: EventsState) => state.list;

export const getDetails = (state: EventsState) => state.details;
