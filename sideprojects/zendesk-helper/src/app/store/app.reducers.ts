import { ActionReducerMap } from '@ngrx/store';

import * as fromEmailData from '../zendesk-body/store/categories.reducers'
import * as fromAuth from '../auth/store/auth.reducers';


export interface AppState {
    emailData: fromEmailData.State,
    auth: fromAuth.State
}

export const reducers: ActionReducerMap<AppState> = {
    emailData: fromEmailData.emailDataReducer,
    auth: fromAuth.authReducer
}