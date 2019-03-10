import * as EmailDataActions from './categories.actions';
import { Category } from 'src/app/shared/category.model';
import { Entry } from 'src/app/shared/entry.model';

export interface State {
    categories: Category[];
    // entries: Entry[];
    editedCategoryIndex: number;
    editedEntryIndex: number;
    editedCategory: Category;
    editedEntry: Entry;
}

const initalState: State = {
    categories: [],
    // entries: [],
    editedCategoryIndex: -1,
    editedEntryIndex: -1,
    editedCategory: null,
    editedEntry: null
}

export function emailDataReducer(state = initalState, action: EmailDataActions.EmailDataActions) {

    switch (action.type) {

        case (EmailDataActions.SET_CATEGORIES):
        return {
          ...state,
          categories: [...action.payload]
        };


        case EmailDataActions.ADD_CATEGORY:
            return {
                ...state,
                categories: [...state.categories, action.payload]
            };
        case EmailDataActions.UPDATE_CATEGORY:
            const category = state.categories[state.editedCategoryIndex]
            const updatedCategory = {
                ...category,
                ...action.payload.category
            };
            const categories = [...state.categories];
            categories[state.editedCategoryIndex] = updatedCategory;
            return {
                ...state,
                categories: categories,
                editedCategory: null,
                editedCategoryIndex: -1
            };

        case EmailDataActions.DELETE_CATEGORY: {
            const oldCatList = [...state.categories];
            oldCatList.splice(state.editedCategoryIndex, 1)
            return {
                ...state,
                categories: oldCatList,
                editedCategory: null,
                editedCategoryIndex: -1
            };
        }

        // case EmailDataActions.ADD_ENTRY: {
        //     return {
        //         ...state,
        //         entries: [...state.entries, action.payload]
        //     }
        // }
        // case EmailDataActions.UPDATE_ENTRY: {
        //     const entry = state.categories[state.editedEntryIndex]
        //     const updateEntry = {
        //         ...entry,
        //         ...action.payload.entry
        //     };
        //     const entries = [...state.entries];
        //     entries[state.editedEntryIndex] = updateEntry;
        //     return {
        //         ...state,
        //         entries: entries,
        //         editedEntry: null,
        //         editedEntryIndex: -1
        //     };
        // }
        // case EmailDataActions.DELETE_ENTRY: {
        //     const oldEntryList = [...state.categories];
        //     oldEntryList.splice(state.editedEntryIndex, 1)
        //     return {
        //         ...state,
        //         categories: oldEntryList,
        //         editedEntry: null,
        //         editedEntryIndex: -1
        //     };
        // }

        default:
            return state;

    }


}