import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { exhaustMap, mergeMap, map, tap, withLatestFrom } from 'rxjs/operators';
import { from } from 'rxjs/observable/from';
import { of } from 'rxjs/observable/of';
import { empty } from 'rxjs/observable/empty';
import { fromPromise } from 'rxjs/observable/fromPromise';

import { EventDataService, PWAService, EventRegistrationService, RemoteRegistrationsService } from "../../core/services";

import * as fromApp from '../../app.reducers';
import * as appActions from '../../app.actions';
import * as eventDetailsActions from '../actions/event-details.actions';
import { getEventDetailsEventDataState, getEventDetailsRegistrationPossibleState } from '../events.selectors';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class EventDetailsEffects {

    constructor(
        private actions$: Actions,
        private store$: Store<fromApp.State>,
        private remoteRegistrationsService: RemoteRegistrationsService,
        private eventRegistrationService: EventRegistrationService,
        private eventDataService: EventDataService,
        private pwaService: PWAService
    ) { }

    @Effect()
    load$: Observable<Action> = this.actions$.pipe(
        ofType<eventDetailsActions.Load>(eventDetailsActions.LOAD),
        map(action => new eventDetailsActions.RetrieveEventDetails(action.payload)));

    @Effect()
    retrieveEventDetails$: Observable<Action> = this.actions$.pipe(
        ofType<eventDetailsActions.RetrieveEventDetails>(eventDetailsActions.RETRIEVE_EVENT_DETAILS),
        mergeMap(action => this.eventDataService
            .getEvent(action.payload)
            .timeout(30000)
            .map(entry => new eventDetailsActions.RetrieveEventDetailsSuccess(entry))
            .catch(error => of(new eventDetailsActions.RetrieveEventDetailsFail(error)))));

    @Effect()
    retrieveEventDetailsSuccess$: Observable<Action> = this.actions$.pipe(
        ofType<eventDetailsActions.RetrieveEventDetailsSuccess>(eventDetailsActions.RETRIEVE_EVENT_DETAILS_SUCCESS),
        mergeMap(action => of(new eventDetailsActions.ValidateRegistrationIfPossible(action.payload))));

    @Effect({ dispatch: false })
    retrieveEventDetailsFail$: Observable<Action> = this.actions$.pipe(
        ofType<eventDetailsActions.RetrieveEventDetailsFail>(eventDetailsActions.RETRIEVE_EVENT_DETAILS_FAIL),
        tap(action => this.pwaService.createHttpErrorToast(action.payload).present()),
        exhaustMap(() => empty()));

    @Effect()
    retrieveRegistrationData$: Observable<Action> = this.actions$.pipe(
        ofType<eventDetailsActions.RetrieveRegistrationData>(eventDetailsActions.RETRIEVE_REGISTRATION_DATA),
        mergeMap(action =>
            fromPromise(this.eventRegistrationService.getRegistrationData()
                .then(val => new eventDetailsActions.RetrieveRegistrationDataSuccess(val))
                .catch(error => new appActions.LogError('Fehler beim Auslesen der Anmeldedaten aus dem Local-Storage', error)))));

    @Effect()
    storeRegistrationData$: Observable<Action> = this.actions$.pipe(
        ofType<eventDetailsActions.StoreRegistrationData>(eventDetailsActions.STORE_REGISTRATION_DATA),
        mergeMap(action =>
            fromPromise(this.eventRegistrationService.setRegistrationData(action.payload)
                .then(val => new eventDetailsActions.StoreRegistrationDataSuccess(action.payload))
                .catch(error => new appActions.LogError('Fehler beim Speichern der Anmeldedaten in den Local-Storage', error)))));

    @Effect()
    validateRegistrationIfPossible$: Observable<Action> = this.actions$.pipe(
        ofType<eventDetailsActions.ValidateRegistrationIfPossible>(eventDetailsActions.VALIDATE_REGISTRATION_IF_POSSIBLE),
        withLatestFrom(this.store$.select(getEventDetailsRegistrationPossibleState)),
        mergeMap(([action, registrationPossible]) => {
            if (registrationPossible && action.payload.registration !== null) {
                return of(new eventDetailsActions.ValidateRegistration(action.payload));
            } else {
                return empty();
            }
        }));

    @Effect()
    validateRegistration$: Observable<Action> = this.actions$.pipe(
        ofType<eventDetailsActions.ValidateRegistration>(eventDetailsActions.VALIDATE_REGISTRATION),
        mergeMap(action =>
            this.remoteRegistrationsService.getRegistration(action.payload.registration)
                .map(entry => new eventDetailsActions.ValidateRegistrationSuccess(entry))
                .catch(error => of(new eventDetailsActions.ValidateRegistrationFail(error)))));

    @Effect({ dispatch: false })
    validateRegistrationFail$: Observable<Action> = this.actions$.pipe(
        ofType<eventDetailsActions.ValidateRegistrationFail>(eventDetailsActions.VALIDATE_REGISTRATION_FAIL),
        withLatestFrom(this.store$.select(getEventDetailsEventDataState)),
        tap(([action, event]) => {
            if (action.payload.status == 404) {
                // die Registrierung kann nicht gefunden werden.
                this.eventRegistrationService.removeRegistrationToken(event.entity.id);
                this.pwaService
                    .createInfoToast({ message: 'Deine Registrierung existiert nicht mehr. Wahrscheinlich hast Du Dich via Email abgemeldet.' })
                    .present()
            }
        }),
        exhaustMap(() => empty()));

    @Effect({ dispatch: false })
    storeRegistrationToken$: Observable<Action> = this.actions$.pipe(
        ofType<eventDetailsActions.StoreRegistrationToken>(eventDetailsActions.STORE_REGISTRATION_TOKEN),
        tap(action => this.eventRegistrationService.setRegistrationToken(action.eventId, action.registrationToken)),
        exhaustMap(() => empty()));

    @Effect({ dispatch: false })
    removeRegistrationToken$: Observable<Action> = this.actions$.pipe(
        ofType<eventDetailsActions.RemoveRegistrationToken>(eventDetailsActions.REMOVE_REGISTRATION_TOKEN),
        tap(action => this.eventRegistrationService.removeRegistrationToken(action.eventId)),
        exhaustMap(() => empty()));

    @Effect()
    performRegistration$: Observable<Action> = this.actions$.pipe(
        ofType<eventDetailsActions.PerformRegistration>(eventDetailsActions.PERFORM_REGISTRATION),
        mergeMap(action =>
            this.remoteRegistrationsService.register(action.eventId, action.registrationData)
                .map(res => new eventDetailsActions.PerformRegistrationResult(action.eventId, res))
                .catch(error => of(new eventDetailsActions.PerformRegistrationResult(action.eventId, error)))));

    @Effect()
    performRegistrationResult$: Observable<Action> = this.actions$.pipe(
        ofType<eventDetailsActions.PerformRegistrationResult>(eventDetailsActions.PERFORM_REGISTRATION_RESULT),
        mergeMap(action => {
            const errorResponse: HttpErrorResponse = action.response as any as HttpErrorResponse;
            switch (action.response.status) {
                case 200: // OK
                case 201: // CREATED
                case 202: // ACCEPTED
                    this.pwaService.createInfoToast({ message: action.response.body.message }).present();
                    return from([
                        new eventDetailsActions.PerformRegistrationAccepted(action.response.body.token),
                        new eventDetailsActions.StoreRegistrationToken(action.eventId, action.response.body.token)]);
                case 403: // FORBIDDEN
                case 404: // NOT FOUND
                case 409: // CONFLICT
                case 423: // LOCKED
                    this.pwaService.createInfoToast({ message: errorResponse.error.message }).present();
                    return empty();
                default: // 500 INTERNAL SERVER ERROR
                    const message = action.response instanceof Error
                        ? (action.response as Error).message
                        : 'Es ist ein nicht näher spezifizierbarer Fehler aufgetreten. Wir können deine Anmeldung im Moment daher nicht verarbeiten.';
                    this.pwaService.createErrorToast({ message: message }).present();
                    return empty();
            }
        }));

    @Effect()
    performUnregistration$: Observable<Action> = this.actions$.pipe(
        ofType<eventDetailsActions.PerformUnregistration>(eventDetailsActions.PERFORM_UNREGISTRATION),
        withLatestFrom(this.store$.select(getEventDetailsEventDataState)),
        mergeMap(([action, event]) =>
            this.remoteRegistrationsService.unregister(event.registration)
                .map(res => new eventDetailsActions.PerformUnregistrationResult(action.eventId, res))
                .catch(error => of(new eventDetailsActions.PerformUnregistrationResult(action.eventId, error)))));

    @Effect()
    performUnregistrationResult$: Observable<Action> = this.actions$.pipe(
        ofType<eventDetailsActions.PerformUnregistrationResult>(eventDetailsActions.PERFORM_UNREGISTRATION_RESULT),
        mergeMap(action => {
            const errorResponse: HttpErrorResponse = action.response as any as HttpErrorResponse;
            switch (action.response.status) {
                case 200: // OK
                case 201: // CREATED
                case 202: // ACCEPTED
                    this.pwaService.createInfoToast({ message: action.response.body.message }).present();
                    return from([
                        new eventDetailsActions.PerformUnregistrationAccepted(),
                        new eventDetailsActions.RemoveRegistrationToken(action.eventId)]);
                case 404: // NOT FOUND
                    // die Registrierung ist nicht mehr vorhanden, wir werten das als Erfolg
                    this.pwaService.createInfoToast({ message: errorResponse.error.message }).present();
                    return from([
                        new eventDetailsActions.PerformUnregistrationAccepted(),
                        new eventDetailsActions.RemoveRegistrationToken(action.eventId)]);
                case 400: // BAD REQUEST
                case 423: // LOCKED
                    this.pwaService.createInfoToast({ message: errorResponse.error.message }).present();
                    return empty();
                default: // 500 INTERNAL SERVER ERROR
                    const message = action.response instanceof Error
                        ? (action.response as Error).message
                        : 'Es ist ein nicht näher spezifizierbarer Fehler aufgetreten. Wir können deine Abmeldung im Moment daher nicht verarbeiten.';
                    this.pwaService.createErrorToast({ message: message }).present();
                    return empty();
            }
        }));

}
