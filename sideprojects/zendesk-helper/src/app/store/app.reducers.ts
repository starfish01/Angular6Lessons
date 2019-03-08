import { ActionReducerMap } from '@ngrx/store';

import * as fromEmailData from '../zendesk-body/store/email-data.reducers'

export interface AppState {
    categories: fromEmailData.State
}

export const reducers: ActionReducerMap<AppState> = {
    // categories: fromEmailData.emailDataReducer
}