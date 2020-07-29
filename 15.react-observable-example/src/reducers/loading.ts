import { AuthActionTypes, LoadingAction } from '../const/ActionTypes'

export type LoadingState = boolean

export default function loading(state: LoadingState = false, action: LoadingAction = {}) {
  switch (action.type) {
    case AuthActionTypes.LOADING_START:
      return true
    case AuthActionTypes.LOADING_END:
      return false
    default:
      return state
  }
}
