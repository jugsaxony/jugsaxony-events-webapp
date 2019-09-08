import * as eventDetails from '../actions/event-details.actions';
import { EventData, RegistrationData } from "../../core/data";

export interface State {
    eventData: EventData;
    registrationData: RegistrationData;
    registrationPossible: boolean;
    pendingFabAction: boolean;
    showHeaderRegistrationButton: boolean;
    loading: boolean;
}

export const initialState: State = {
    eventData: null,
    registrationData: {},
    registrationPossible: false,
    pendingFabAction: false,
    showHeaderRegistrationButton: false,
    loading: false,
}

export function reducer(state = initialState, action: eventDetails.Actions): State {
    switch (action.type) {
        case eventDetails.LOAD:
            return {
                ...state,
                eventData: null,
                registrationPossible: false,
                showHeaderRegistrationButton: false,
            };
        case eventDetails.LEAVE:
            return {
                ...state,
                ...initialState
            };
        case eventDetails.RETRIEVE_EVENT_DETAILS:
            return {
                ...state,
                loading: true
            }
        case eventDetails.RETRIEVE_EVENT_DETAILS_SUCCESS:
            return {
                ...state,
                eventData: action.payload,
                registrationPossible: action.payload.entity.startTime > new Date() && !action.payload.entity.cancelled,
                loading: false
            };
        case eventDetails.RETRIEVE_EVENT_DETAILS_FAIL: {
            return {
                ...state,
                loading: false
            }
        }
        case eventDetails.RETRIEVE_REGISTRATION_DATA_SUCCESS:
            return {
                ...state,
                registrationData: action.payload || {}
            }
        case eventDetails.STORE_REGISTRATION_DATA_SUCCESS:
            return {
                ...state,
                registrationData: action.payload || {}
            }
        case eventDetails.VALIDATE_REGISTRATION_FAIL:
            return {
                ...state,
                eventData: {
                    ...state.eventData,
                    registration: null
                }
            }
        case eventDetails.PERFORM_REGISTRATION:
            return {
                ...state,
                pendingFabAction: true
            }
        case eventDetails.PERFORM_REGISTRATION_RESULT:
            return {
                ...state,
                pendingFabAction: false
            }
        case eventDetails.PERFORM_REGISTRATION_ACCEPTED:
            return {
                ...state,
                eventData: {
                    ...state.eventData,
                    registration: action.payload
                },
                showHeaderRegistrationButton: false
            }
        case eventDetails.PERFORM_UNREGISTRATION:
            return {
                ...state,
                pendingFabAction: true
            }
        case eventDetails.PERFORM_UNREGISTRATION_RESULT:
            return {
                ...state,
                pendingFabAction: false
            }
        case eventDetails.PERFORM_UNREGISTRATION_ACCEPTED:
            return {
                ...state,
                eventData: {
                    ...state.eventData,
                    registration: null
                },
                pendingFabAction: false
            }
        case eventDetails.TOGGLE_SHOW_HEADER_REGISTRATION_BUTTON:
            // wir verstoßen gegen das Prinzip "kein fachlicher Code im Reducer", da dieses Event sehr häufig triggert
            if (!state.registrationPossible || state.eventData.registration !== null || state.showHeaderRegistrationButton === action.payload) {
                return state;
            } else {
                return {
                    ...state,
                    showHeaderRegistrationButton: action.payload
                }
            }
        default:
            return state;
    }
}

export const getEventData = (state: State) => state.eventData;
export const getRegistrationData = (state: State) => state.registrationData;
export const getRegistrationPossible = (state: State) => state.registrationPossible;
export const getPendingFabAction = (state: State) => state.pendingFabAction;
export const getShowHeaderRegistrationButton = (state: State) => state.showHeaderRegistrationButton;
export const getLoading = (state: State) => state.loading;
