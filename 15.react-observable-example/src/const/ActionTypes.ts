import { Action } from 'redux'

export const enum AuthActionTypes {
  LOADING_START = 'LOADING_START',
  LOADING_END = 'LOADING_END',
  GET_AUTH = 'GET_AUTH',
  SET_AUTH = 'SET_AUTH',
  RESET_AUTH = 'RESET_AUTH',
  SHOW_ERROR_MESSAGE = 'SHOW_ERROR_MESSAGE',
  HIDE_ERROR_MESSAGE = 'HIDE_ERROR_MESSAGE',
}

type AuthTypeActions = Partial<Action<AuthActionTypes>>

export interface LoadingAction extends AuthTypeActions {}

export interface ErrorMessageAction extends AuthTypeActions {
  message?: string
}

export interface AuthAction extends AuthTypeActions {
  auth?: object
}

export interface GetAuthAction {
  type: AuthActionTypes.GET_AUTH
  username: string
  password: string
}

export type AuthActions = LoadingAction | ErrorMessageAction | AuthAction
