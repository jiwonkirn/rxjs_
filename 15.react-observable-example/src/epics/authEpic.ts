import { from } from 'rxjs'
import { switchMap, mergeMap, startWith, catchError, concat } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { AuthActionTypes, GetAuthAction } from '../const/ActionTypes'
import * as actions from '../actions'
import { fakeAuth } from '../services/authService'

export default function authEpic(action$, store) {
  return action$.pipe(
    ofType(AuthActionTypes.GET_AUTH),
    switchMap((action: GetAuthAction) =>
      from(fakeAuth(action.username, action.password)).pipe(
        mergeMap(
          auth => [actions.setAuth(auth), actions.hideErrorMessage()],
          startWith(actions.loadingStart()),
          catchError(error => [actions.showErrorMessage(error.message)]),
          concat([actions.loadingEnd()]),
        ),
      ),
    ),
  )
}
