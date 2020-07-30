import { AuthActionTypes, ErrorMessageAction } from '../const/ActionTypes'

export default function errorMessage(state = '', action: ErrorMessageAction = {}) {
  switch (action.type) {
    case AuthActionTypes.SHOW_ERROR_MESSAGE:
      return action.message ?? ''
    case AuthActionTypes.HIDE_ERROR_MESSAGE:
      return ''
    default:
      return state
  }
}
