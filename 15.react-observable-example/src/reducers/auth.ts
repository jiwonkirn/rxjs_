import { AuthActionTypes, AuthAction } from '../const/ActionTypes'

export type AuthState = object | null

const initialState = null

export default function auth(state = initialState, action: AuthAction = {}): AuthState {
  switch (action.type) {
    case AuthActionTypes.SET_AUTH:
      return action.auth ?? null
    case AuthActionTypes.RESET_AUTH:
      return null
    default:
      return state
  }
}
