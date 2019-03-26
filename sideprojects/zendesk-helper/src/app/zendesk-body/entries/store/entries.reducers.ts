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
    selectedEntry:null,
   
}

export function entriesData(state = initalState, action: EntryActions.EmailDataActions) {

    switch (action.type) {



        case EntryActions.UPDATE_ENTRY:

        console.log('reducer')
        console.log(action.payload.id)
        console.log(state.entries)
        // state.entries.indexOf()

        let index = state.entries.findIndex(x => x.id ===action.payload.id);
        //cool this is correct
        console.log(index)



            // const entry = state.entries[state.editedentryndex]
            // const updatedentry = {
            //     ...entry,
            //     ...action.payload
            // };
            // const categories = [...state.entries];
            // categories[state.editedentryIndex] = updatedentry;
            return {
                ...state,
                // categories: categories,
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

        

        // case EntryActions.DELETE_ENTRY: {
        //     const oldCatList = [...state.entries];
        //     oldCatList.splice(state.editedentryIndex, 1)
        //     return {
        //         ...state,
        //         categories: oldCatList,
        //         editedentry: null,
        //         editedentryIndex: -1
        //     };
        // }

        default:
            return state;

    }


}