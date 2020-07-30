import { AuthActionTypes, AuthAction } from '../const/ActionTypes'

export interface AuthState {
  username?: string
}

const initialState = {}

export default function auth(state: AuthState = initialState, action: AuthAction): AuthState {
  switch (action.type) {
    case AuthActionTypes.SET_AUTH:
      return action.auth ?? {}
    case AuthActionTypes.RESET_AUTH:
      return {}
    default:
      return state
  }
}
