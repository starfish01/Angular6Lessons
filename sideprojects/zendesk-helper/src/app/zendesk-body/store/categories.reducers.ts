import * as CategoryActions from './categories.actions';
import { Category } from 'src/app/shared/category.model';
import { Entry } from 'src/app/shared/entry.model';

var slugify = require('slugify')

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

export function emailDataReducer(state = initalState, action: CategoryActions.EmailDataActions) {

    switch (action.type) {

        case CategoryActions.ADD_CATEGORY:
        return {
                ...state,
                categories: [...state.categories, action.payload]
            };

            case (CategoryActions.SET_CATEGORIES):
        return {
          ...state,
          categories: [...action.payload]
        };

        case CategoryActions.UPDATE_CATEGORY:
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

        case CategoryActions.DELETE_CATEGORY: {
            const oldCatList = [...state.categories];
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