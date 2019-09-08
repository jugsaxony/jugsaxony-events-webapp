import { byStartTimeAsc, byStartTimeDesc } from '../../core/functions/sort-functions'

import * as eventList from '../actions/event-list.actions';
import { EventData } from '../../core/data';

export interface State {
    futureEvents: EventData[];
    pastEvents: EventData[];
    loading: boolean;
    showCurrentOrFutureEvents: boolean;
}

export const initialState: State = {
    futureEvents: [],
    pastEvents: [],
    loading: false,
    showCurrentOrFutureEvents: true
}

export function reducer(state = initialState, action: eventList.Actions): State {
    switch (action.type) {
        case eventList.REFRESH:
            return {
                ...state,
                loading: true,
            };
        case eventList.REFRESH_SUCCESS:
            return {
                ...state,
                futureEvents: action.payload.filter(i => i.currentOrFuture).sort(byStartTimeAsc),
                pastEvents: action.payload.filter(i => !i.currentOrFuture).sort(byStartTimeDesc),
                loading: false
            };
        case eventList.REFRESH_FAIL:
            return {
                ...state,
                loading: false
            };
        case eventList.TOGGLE_PRESENT_PAST:
            return {
                ...state,
                showCurrentOrFutureEvents: !state.showCurrentOrFutureEvents
            };
        default:
            return state;
    }
}

export const getFutureEvents = (state: State) => state.futureEvents;
export const getPastEvents = (state: State) => state.pastEvents;
export const getLoading = (state: State) => state.loading;
export const getShowCurrentOrFutureEvents = (state: State) => state.showCurrentOrFutureEvents;
