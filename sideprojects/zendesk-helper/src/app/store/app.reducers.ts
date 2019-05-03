import { ActionReducerMap, combineReducers } from '@ngrx/store';

import * as fromEmailData from '../zendesk-body/store/categories.reducers'
import * as fromEntriesData from '../zendesk-body/entries/store/entries.reducers'


export interface AppState {
    emailData: fromEmailData.State,
    entriesData: fromEntriesData.State
}

export const reducers: ActionReducerMap<AppState> = {
    emailData: fromEmailData.emailDataReducer,
    entriesData: fromEntriesData.entriesData
}

const appReducer = combineReducers({
    /* your app’s top-level reducers */
})

const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
        state = undefined
    }

    return appReducer(state, action)
}