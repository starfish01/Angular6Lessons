import { Action } from '@ngrx/store';
import { Category } from 'src/app/shared/category.model';
import { Entry } from 'src/app/shared/entry.model';

export const ADD_CATEGORY = 'ADD_CATEGORY';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'

export const ADD_ENTRY = 'ADD_ENTRY';
export const UPDATE_ENTRY = 'UPDATE_ENTRY';
export const DELETE_ENTRY = 'DELETE_ENTRY';


// Category Actions

export class AddCategory implements Action {
    readonly type = ADD_CATEGORY;
    constructor(public payload: Category) { }
}

export class UpdateCategory implements Action {
    readonly type = UPDATE_CATEGORY;
    constructor(public payload: { category: Category }) { }
}

export class DeleteCategory implements Action {
    readonly type = DELETE_CATEGORY;
}

// Entry Actions

export class AddEntry implements Action {
    readonly type = ADD_ENTRY;
    constructor(public payload: Category) { }
}

export class UpdateEntry implements Action {
    readonly type = UPDATE_ENTRY;
    constructor(public payload: { entry: Entry }) { }
}

export class DeleteEntry implements Action {
    readonly type = DELETE_ENTRY;
}


export type EmailDataActions = AddCategory
    | UpdateCategory
    | DeleteCategory
    | AddEntry
    | UpdateEntry
    | DeleteEntry;