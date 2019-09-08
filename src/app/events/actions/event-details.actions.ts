import { HttpResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';

import { RegistrationEntity, RegistrationConfirmationEntity, EventId, RegistrationToken } from '../../core/entities';
import { EventData, RegistrationData } from "../../core/data";

export const LOAD = '[EventDetails] Load';

export const LEAVE = '[EventDetails] Leave';

export const RETRIEVE_EVENT_DETAILS = '[EventDetails] Retrieve Event Details';
export const RETRIEVE_EVENT_DETAILS_SUCCESS = '[EventDetails] Retrieve Event Details Success';
export const RETRIEVE_EVENT_DETAILS_FAIL = '[EventDetails] Retrieve Event Details Fail';

export const RETRIEVE_REGISTRATION_DATA = '[EventDetails] Retrieve Registration Data';
export const RETRIEVE_REGISTRATION_DATA_SUCCESS = '[EventDetails] Retrieve Registration Data Success';

export const STORE_REGISTRATION_DATA = '[EventDetails] Store Registration Data';
export const STORE_REGISTRATION_DATA_SUCCESS = '[EventDetails] Store Registration Data Success';

export const STORE_REGISTRATION_TOKEN = '[EventDetails] Store Registration Token';
export const REMOVE_REGISTRATION_TOKEN = '[EventDetails] Remove Registration Token';

export const VALIDATE_REGISTRATION_IF_POSSIBLE = '[EventDetails] Validate Registration If Possible';

export const VALIDATE_REGISTRATION = '[EventDetails] Validate Registration';
export const VALIDATE_REGISTRATION_SUCCESS = '[EventDetails] Validate Registration Success';
export const VALIDATE_REGISTRATION_FAIL = '[EventDetails] Validate Registration Fail';

export const PERFORM_REGISTRATION = '[EventDetails] Perform Registration';
export const PERFORM_REGISTRATION_RESULT = '[EventDetails] Perform Registration Result';
export const PERFORM_REGISTRATION_ACCEPTED = '[EventDetails] Perform Registration Accepted';

export const PERFORM_UNREGISTRATION = '[EventDetails] Perform Unregistration';
export const PERFORM_UNREGISTRATION_RESULT = '[EventDetails] Perform Unregistration Result';
export const PERFORM_UNREGISTRATION_ACCEPTED = '[EventDetails] Perform Unregistration Accepted';

export const TOGGLE_SHOW_HEADER_REGISTRATION_BUTTON = '[EventDetails] Show Header Registration Button';

export class Load implements Action {
    readonly type = LOAD;
    constructor(public payload: EventId) { }
}

export class Leave implements Action {
    readonly type = LEAVE;
}

export class RetrieveEventDetails implements Action {
    readonly type = RETRIEVE_EVENT_DETAILS
    constructor(public payload: EventId) { }
}

export class RetrieveEventDetailsSuccess implements Action {
    readonly type = RETRIEVE_EVENT_DETAILS_SUCCESS
    constructor(public payload: EventData) { }
}

export class RetrieveEventDetailsFail implements Action {
    readonly type = RETRIEVE_EVENT_DETAILS_FAIL
    constructor(public payload: any) { }
}

export class RetrieveRegistrationData implements Action {
    readonly type = RETRIEVE_REGISTRATION_DATA;
}

export class RetrieveRegistrationDataSuccess implements Action {
    readonly type = RETRIEVE_REGISTRATION_DATA_SUCCESS;
    constructor(public payload: RegistrationData) { }
}

export class StoreRegistrationData implements Action {
    readonly type = STORE_REGISTRATION_DATA;
    constructor(public payload: RegistrationData) { }
}

export class StoreRegistrationDataSuccess implements Action {
    readonly type = STORE_REGISTRATION_DATA_SUCCESS;
    constructor(public payload: RegistrationData) { }
}

export class StoreRegistrationToken implements Action {
    readonly type = STORE_REGISTRATION_TOKEN;
    constructor(public eventId: EventId, public registrationToken: RegistrationToken) { }
}

export class RemoveRegistrationToken implements Action {
    readonly type = REMOVE_REGISTRATION_TOKEN;
    constructor(public eventId: EventId) { }
}

export class ValidateRegistrationIfPossible implements Action {
    readonly type = VALIDATE_REGISTRATION_IF_POSSIBLE;
    constructor(public payload: EventData) { }
}

export class ValidateRegistration implements Action {
    readonly type = VALIDATE_REGISTRATION;
    constructor(public payload: EventData) { }
}

export class ValidateRegistrationSuccess implements Action {
    readonly type = VALIDATE_REGISTRATION_SUCCESS;
    constructor(public payload: RegistrationEntity) { }
}

export class ValidateRegistrationFail implements Action {
    readonly type = VALIDATE_REGISTRATION_FAIL;
    constructor(public payload: any) { }
}

export class PerformRegistration implements Action {
    readonly type = PERFORM_REGISTRATION;
    constructor(public eventId: EventId, public registrationData: RegistrationData) { }
}

export class PerformRegistrationResult implements Action {
    readonly type = PERFORM_REGISTRATION_RESULT;
    constructor(public eventId: EventId, public response: HttpResponse<RegistrationConfirmationEntity>) { }
}

export class PerformRegistrationAccepted implements Action {
    readonly type = PERFORM_REGISTRATION_ACCEPTED;
    constructor(public payload: RegistrationToken) { }
}

export class PerformUnregistration implements Action {
    readonly type = PERFORM_UNREGISTRATION;
    constructor(public eventId: EventId) { }
}

export class PerformUnregistrationResult implements Action {
    readonly type = PERFORM_UNREGISTRATION_RESULT;
    constructor(public eventId: EventId, public response: HttpResponse<RegistrationConfirmationEntity>) { }
}

export class PerformUnregistrationAccepted implements Action {
    readonly type = PERFORM_UNREGISTRATION_ACCEPTED;
}

export class ToggleShowHeaderRegistrationButton implements Action {
    readonly type = TOGGLE_SHOW_HEADER_REGISTRATION_BUTTON;
    constructor(public payload: boolean) { }
}

export type Actions = Load | Leave |
    RetrieveEventDetails | RetrieveEventDetailsSuccess | RetrieveEventDetailsFail |
    RetrieveRegistrationData | RetrieveRegistrationDataSuccess |
    StoreRegistrationData | StoreRegistrationDataSuccess |
    StoreRegistrationToken | RemoveRegistrationToken |
    ValidateRegistrationIfPossible | ValidateRegistration | ValidateRegistrationSuccess | ValidateRegistrationFail |
    PerformRegistration | PerformRegistrationResult | PerformRegistrationAccepted |
    PerformUnregistration | PerformUnregistrationResult | PerformUnregistrationAccepted |
    ToggleShowHeaderRegistrationButton;