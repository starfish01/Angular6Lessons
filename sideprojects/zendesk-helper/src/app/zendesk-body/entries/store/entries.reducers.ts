import * as EntryActions from './entries.actions';
// import { entry } from 'src/app/shared/entry.model';
import { Entry } from 'src/app/shared/entry.model';

var slugify = require('slugify')

export interface State {
    selectedCategory: String;
    entries: Entry[];
    selectedEntry: Entry;
}

const initalState: State = {
    selectedCategory: null,
    entries: [],
    selectedEntry: null,

}

export function entriesData(state = initalState, action: EntryActions.EmailDataActions) {

    switch (action.type) {

        case EntryActions.UPDATE_ENTRY:
            let index = state.entries.findIndex(x => x.id === action.payload.id);

            state.entries[index].title = action.payload.title
            state.entries[index].content = action.payload.content

            return {
                ...state,
            };

        case EntryActions.SELECTED_ENTRY:
            return {
                ...state,
                selectedEntry: null
            }

        case EntryActions.SELECT_ENTRY:
            return {
                ...state,
                selectedEntry: action.payload.index
            }


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



        case EntryActions.DELETE_ENTRY: {

            //need the effect for this


            let index = state.entries.findIndex(x => x.id === action.payload.id);

            const oldList = [...state.entries];
            oldList.splice(index,1);
            state.entries = oldList
            

            return {
                ...state,
            };
        }

        default:
            return state;

    }


}