import { createSelector, createFeatureSelector, } from '@ngrx/store';

import * as fromApp from './app.reducers';

export const getAppState = createFeatureSelector<fromApp.State>('app');

export const getAppActivePageState = createSelector(getAppState, fromApp.getActivePage);
export const getAppOfflineState = createSelector(getAppState, fromApp.getOffline);
export const getAppUpdateAvailableState = createSelector(getAppState, fromApp.getUpdateAvailable);
export const getAppConfigurationState = createSelector(getAppState, fromApp.getConfiguration);
