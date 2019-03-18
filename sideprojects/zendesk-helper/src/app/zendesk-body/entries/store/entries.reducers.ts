import * as EntryActions from './entries.actions';
import { Category } from 'src/app/shared/category.model';
import { Entry } from 'src/app/shared/entry.model';

var slugify = require('slugify')

export interface State {
    // categories: Category[];
    entries: Entry[];
    editedCategoryIndex: number;
    editedEntryIndex: number;
    // editedCategory: Category;
    editedEntry: Entry;
}

const initalState: State = {
    // categories: [],
    entries: [],
    editedCategoryIndex: -1,
    editedEntryIndex: -1,
    // editedCategory: null,
    editedEntry: null
}

export function entriesData(state = initalState, action: EntryActions.EmailDataActions) {

    switch (action.type) {

        case EntryActions.ADD_ENTRY:
        return {
                ...state,
                categories: [...state.entries, action.payload]
            };

        case EntryActions.UPDATE_ENTRY:
            const category = state.entries[state.editedCategoryIndex]
            const updatedCategory = {
                ...category,
                ...action.payload.category
            };
            const categories = [...state.entries];
            categories[state.editedCategoryIndex] = updatedCategory;
            return {
                ...state,
                categories: categories,
                editedCategory: null,
                editedCategoryIndex: -1
            };

        case EntryActions.DELETE_ENTRY: {
            const oldCatList = [...state.entries];
            oldCatList.splice(state.editedCategoryIndex, 1)
            return {
                ...state,
                categories: oldCatList,
                editedCategory: null,
                editedCategoryIndex: -1
            };
        }

        default:
            return state;

    }


}