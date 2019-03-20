import { Action } from '@ngrx/store';
import { Entry } from 'src/app/shared/entry.model';

export const ADD_ENTRY = 'ADD_ENTRY';
export const UPDATE_ENTRY = 'UPDATE_ENTRY';
export const DELETE_ENTRY = 'DELETE_ENTRY';
export const FETCH_ENTRIES = 'FETCH_ENTRIES';
export const SET_ENTRIES = 'SET_ENTRIES';

export const SELECTED_CATEGORY = 'SELECTED_CATEGORY';
export const UNSELECT_CATEGORY = 'UNSELECT_CATEGORY'; 



// Category Actions

export class SelectCategory implements Action {
    readonly type = SELECTED_CATEGORY;
    constructor(public payload: {index: string}) {}
}

export class UnselectCategory implements Action {
    readonly type = UNSELECT_CATEGORY;
}

export class AddEntry implements Action {
    readonly type = ADD_ENTRY;
    constructor(public payload: Entry) { }
}

export class UpdateEntry implements Action {
    readonly type = UPDATE_ENTRY;
    constructor(public payload: { category: Entry }) { }
}

export class DeleteEntry implements Action {
    readonly type = DELETE_ENTRY;
    constructor(public payload: String) { }
}

export class FetchEntries implements Action {
    readonly type = FETCH_ENTRIES;
}

export class SetEntries implements Action {
    readonly type = SET_ENTRIES;

    constructor(public payload: Entry[]) { }
}





export type EmailDataActions = 
    | AddEntry
    | UpdateEntry
    | DeleteEntry
    | FetchEntries
    | SetEntries
    | SelectCategory
    | UnselectCategory
    ;