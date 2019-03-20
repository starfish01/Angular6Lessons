import * as EntryActions from './entries.actions';
// import { entry } from 'src/app/shared/entry.model';
import { Entry } from 'src/app/shared/entry.model';

var slugify = require('slugify')

export interface State {
    // categories: entry[];
    selectedCategory: String;
    entries: Entry[];
    editedentryIndex: number;
    editedEntryIndex: number;
    // editedentry: entry;
    editedEntry: Entry;
}

const initalState: State = {
    selectedCategory: null,
    // categories: [],
    entries: [],
    editedentryIndex: -1,
    editedEntryIndex: -1,
    // editedentry: null,
    editedEntry: null
}

export function entriesData(state = initalState, action: EntryActions.EmailDataActions) {

    switch (action.type) {

        case EntryActions.UNSELECT_CATEGORY: 
            return {
                ...state,
                selectedCategory: null
            }

        case EntryActions.SELECTED_CATEGORY:
        return {
            ...state,
            selectedCategory: action.payload.index
        }


        case EntryActions.ADD_ENTRY:
            return {
                ...state,
                entries: [...state.entries, action.payload]
            };


        case EntryActions.SET_ENTRIES:
            return {
                ...state,
                entries: [...action.payload]
            };

        case EntryActions.UPDATE_ENTRY:
            const entry = state.entries[state.editedentryIndex]
            const updatedentry = {
                ...entry,
                ...action.payload
            };
            const categories = [...state.entries];
            categories[state.editedentryIndex] = updatedentry;
            return {
                ...state,
                categories: categories,
                editedentry: null,
                editedentryIndex: -1
            };

        case EntryActions.DELETE_ENTRY: {
            const oldCatList = [...state.entries];
            oldCatList.splice(state.editedentryIndex, 1)
            return {
                ...state,
                categories: oldCatList,
                editedentry: null,
                editedentryIndex: -1
            };
        }

        default:
            return state;

    }


}