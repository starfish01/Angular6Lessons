import { ActionReducerMap } from '@ngrx/store';

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