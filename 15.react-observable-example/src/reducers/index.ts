import { combineReducers } from 'redux'

import auth, { AuthState } from './auth'
import errorMessage, { ErrorMessageState } from './errorMessage'
import loading, { LoadingState } from './loading'

export interface Store {
  auth: AuthState
  errorMessage: ErrorMessageState
  loading: LoadingState
}

export default combineReducers({
  auth,
  errorMessage,
  loading,
})
