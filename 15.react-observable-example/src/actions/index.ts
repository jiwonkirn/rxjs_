import { AuthActionTypes } from '../const/ActionTypes'

interface Auth {}

export function getAuth(username: string, password: string) {
  return {
    type: AuthActionTypes.GET_AUTH,
    username,
    password,
  }
}

export function setAuth(auth: Auth) {
  return {
    type: AuthActionTypes.SET_AUTH,
    auth,
  }
}

export function resetAuth() {
  return {
    type: AuthActionTypes.RESET_AUTH,
  }
}

export function loadingStart() {
  return {
    type: AuthActionTypes.LOADING_START,
  }
}

export function loadingEnd() {
  return {
    type: AuthActionTypes.LOADING_END,
  }
}

export function showErrorMessage(message: string) {
  return {
    type: AuthActionTypes.SHOW_ERROR_MESSAGE,
    message,
  }
}

export function hideErrorMessage() {
  return {
    type: AuthActionTypes.HIDE_ERROR_MESSAGE,
  }
}
