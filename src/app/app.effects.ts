import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { exhaustMap, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { empty } from 'rxjs/observable/empty';

import * as appActions from './app.actions';
import { RemoteClientService } from './core/services';

@Injectable()
export class AppEffects {

    constructor(
        private actions$: Actions,
        private remoteClientService: RemoteClientService
    ) { }

    @Effect()
    clientConfiguration$: Observable<Action> = this.actions$.pipe(
        ofType<appActions.ClientConfiguration>(appActions.CLIENT_CONFIGURATION),
        mergeMap(action =>
            this.remoteClientService
                .getConfiguration()
                .timeout(30000)
                .map(configuration => new appActions.ClientConfigurationResult(configuration))
                .catch(error => of(new appActions.LogError('ClientConfiguration konnte nicht geladen werden', error)))));

    @Effect({ dispatch: false })
    logInfo$: Observable<Action> = this.actions$.pipe(
        ofType<appActions.LogInfo>(appActions.LOG_INFO),
        tap(action => console.info(action.message, action.error)),
        exhaustMap(() => empty()));

    @Effect({ dispatch: false })
    logWarning$: Observable<Action> = this.actions$.pipe(
        ofType<appActions.LogWarning>(appActions.LOG_WARNING),
        tap(action => console.warn(action.message, action.error)),
        exhaustMap(() => empty()));

    @Effect({ dispatch: false })
    logError$: Observable<Action> = this.actions$.pipe(
        ofType<appActions.LogError>(appActions.LOG_ERROR),
        tap(action => console.error(action.message, action.error)),
        exhaustMap(() => empty()));
}
