import { AuthActionTypes, ErrorMessageAction } from '../const/ActionTypes'

export type ErrorMessageState = string

export default function errorMessage(state: ErrorMessageState = '', action: ErrorMessageAction = {}) {
  switch (action.type) {
    case AuthActionTypes.SHOW_ERROR_MESSAGE:
      return action.message
    case AuthActionTypes.HIDE_ERROR_MESSAGE:
      return null
    default:
      return state
  }
}
