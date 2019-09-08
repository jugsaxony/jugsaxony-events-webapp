import { Action } from '@ngrx/store';
import { ClientConfigurationEntity } from './core/entities';

export const CHANGE_PAGE = '[App] Change Page';
export const ONLINE_STATE_CHANGE = '[App] Online State Change';
export const CLIENT_CONFIGURATION = '[App] Client Configuration';
export const CLIENT_CONFIGURATION_RESULT = '[App] Client Configuration Result';
export const LOG_INFO = '[App] Log Info';
export const LOG_WARNING = '[App] Log Warning';
export const LOG_ERROR = '[App] Log Error';

export class ChangePage implements Action {
    readonly type = CHANGE_PAGE;
    constructor(public payload: any) { }
}

export class OnlineStateChange implements Action {
    readonly type = ONLINE_STATE_CHANGE;
    constructor(public payload: boolean) { }
}

export class ClientConfiguration implements Action {
    readonly type = CLIENT_CONFIGURATION;
}

export class ClientConfigurationResult implements Action {
    readonly type = CLIENT_CONFIGURATION_RESULT;
    constructor(public payload: ClientConfigurationEntity) { }
}

export class LogInfo implements Action {
    readonly type = LOG_INFO;
    constructor(public message: string, public error: any) { }
}

export class LogWarning implements Action {
    readonly type = LOG_WARNING;
    constructor(public message: string, public error: any) { }
}

export class LogError implements Action {
    readonly type = LOG_ERROR;
    constructor(public message: string, public error: any) { }
}

export type Actions = ChangePage |
    OnlineStateChange | ClientConfiguration | ClientConfigurationResult |
    LogInfo | LogWarning | LogError;
