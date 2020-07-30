import { combineReducers } from 'redux'

import auth, { AuthState } from './auth'
import errorMessage from './errorMessage'
import loading, { LoadingState } from './loading'

export interface Store {
  auth: AuthState
  errorMessage: string
  loading: LoadingState
}

export const rootReducer = combineReducers({
  auth,
  errorMessage,
  loading,
})
