import { ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';
import { environment } from './util/environment';

import * as app from './app.actions';
import { ClientConfigurationEntity } from './core/entities';

export interface State {
}

export const reducers: ActionReducerMap<State> = {
    app: appReducer
};

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
    return environment.production
        ? reducer
        : function (state: State, action: any): State {
            console.log('state before', state);
            console.log('action', action);
            const stateAfter = reducer(state, action);
            console.log('state after', stateAfter);
            return stateAfter;
        };
}

export const metaReducers: MetaReducer<State>[] = [logger];

export interface AppState {
    activePage: any,
    offline: boolean,
    updateAvailable: boolean
    configuration: ClientConfigurationEntity
}

const initialAppState: AppState = {
    activePage: null,
    offline: true,
    updateAvailable: false,
    configuration: null
};

export function appReducer(state = initialAppState, action: app.Actions): AppState {
    switch (action.type) {
        case app.CHANGE_PAGE:
            return {
                ...state,
                activePage: action.payload
            }
        case app.ONLINE_STATE_CHANGE:
            return {
                ...state,
                offline: !action.payload
            }
        case app.CLIENT_CONFIGURATION_RESULT:
            return {
                ...state,
                configuration: action.payload,
                updateAvailable: environment.version != action.payload.version
            }
        default:
            return state;
    }
}

export const getActivePage = (state: AppState) => state.activePage;
export const getOffline = (state: AppState) => state.offline;
export const getUpdateAvailable = (state: AppState) => state.updateAvailable;
export const getConfiguration = (state: AppState) => state.configuration;
