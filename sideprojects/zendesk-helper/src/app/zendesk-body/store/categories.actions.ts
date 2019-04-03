import { Action } from '@ngrx/store';
import { Category } from 'src/app/shared/category.model';
import { Entry } from 'src/app/shared/entry.model';

export const ADD_CATEGORY = 'ADD_CATEGORY';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const STORE_CATEGORIES = 'STORE_CATEGORIES';

export const CLEAR_DATA = 'CLEAR_DATA'

// Category Actions

export class ClearData implements Action {
    readonly type = CLEAR_DATA;
}


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
    constructor(public payload: String) { }
}

export class FetchCategories implements Action {
    readonly type = FETCH_CATEGORIES;
}

export class SetCategories implements Action {
    readonly type = SET_CATEGORIES;

    constructor(public payload: Category[]) { }
}


export type EmailDataActions = AddCategory
    | UpdateCategory
    | DeleteCategory
    | FetchCategories
    | SetCategories
    | ClearData
    ;