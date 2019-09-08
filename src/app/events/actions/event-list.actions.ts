import { NavController } from 'ionic-angular';

import { Action } from '@ngrx/store';
import { EventId } from '../../core/entities';
import { EventData } from '../../core/data';

export const REFRESH = '[EventList] Refresh';
export const REFRESH_SUCCESS = '[EventList] Refresh Success';
export const REFRESH_FAIL = '[EventList] Refresh Fail';
export const REFRESH_IF_PAGE_VISIBLE = '[EventList] Refresh If Page Visible';

export const TOGGLE_PRESENT_PAST = '[EventList] Toggle Present/Past';

export const OPEN_DETAIL_PAGE = '[EventList] Open Detail Page';

export class Refresh implements Action {
    readonly type = REFRESH;
}

export class RefreshSuccess implements Action {
    readonly type = REFRESH_SUCCESS;
    constructor(public payload: EventData[]) { }
}

export class RefreshFail implements Action {
    readonly type = REFRESH_FAIL;
    constructor(public payload: any) { }
}

export class RefreshIfPageVisible implements Action {
    readonly type = REFRESH_IF_PAGE_VISIBLE;
}

export class TogglePresentPast implements Action {
    readonly type = TOGGLE_PRESENT_PAST;
}

export class OpenDetailPage implements Action {
    readonly type = OPEN_DETAIL_PAGE;
    constructor(public eventId: EventId, public navController: NavController) { }
}

export type Actions = Refresh | RefreshSuccess | RefreshFail | RefreshIfPageVisible | TogglePresentPast | OpenDetailPage;
