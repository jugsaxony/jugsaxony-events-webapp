import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { mergeMap, exhaustMap, withLatestFrom, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { empty } from 'rxjs/observable/empty';

import { PWAService, EventDataService } from '../../core/services';
import { EventDetailsPage, EventListPage } from '../pages';

import * as fromApp from '../../app.reducers';
import * as eventListActions from '../actions/event-list.actions';
import { getAppActivePageState } from '../../app.selectors';

@Injectable()
export class EventListEffects {

    constructor(
        private actions$: Actions,
        private store$: Store<fromApp.State>,
        private eventDataService: EventDataService,
        private pwaService: PWAService
    ) { }

    @Effect()
    refresh$: Observable<Action> = this.actions$.pipe(
        ofType<eventListActions.Refresh>(eventListActions.REFRESH),
        mergeMap(action =>
            this.eventDataService
                .getEventList()
                .timeout(30000)
                .map(list => new eventListActions.RefreshSuccess(list))
                .catch(error => of(new eventListActions.RefreshFail(error)))));

    @Effect()
    refreshIfPageVisible$: Observable<Action> = this.actions$.pipe(
        ofType<eventListActions.RefreshIfPageVisible>(eventListActions.REFRESH_IF_PAGE_VISIBLE),
        withLatestFrom(this.store$.select(getAppActivePageState)),
        mergeMap(([action, activePage]) => activePage === EventListPage ? of(new eventListActions.Refresh()) : empty()));

    @Effect({ dispatch: false })
    refreshFail$: Observable<Action> = this.actions$.pipe(
        ofType<eventListActions.RefreshFail>(eventListActions.REFRESH_FAIL),
        tap(action => this.pwaService.createHttpErrorToast(action.payload).present()),
        exhaustMap(() => empty()));

    @Effect({ dispatch: false })
    openDetailPage$: Observable<Action> = this.actions$.pipe(
        ofType<eventListActions.OpenDetailPage>(eventListActions.OPEN_DETAIL_PAGE),
        tap(action => action.navController.push(EventDetailsPage, { id: action.eventId })),
        exhaustMap(() => empty()));
}
