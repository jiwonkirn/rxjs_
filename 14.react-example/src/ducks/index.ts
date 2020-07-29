import { Reducer, AnyAction } from 'redux'
import { Subject, BehaviorSubject, empty, of, Observable, from } from 'rxjs'
import { scan, concatMap } from 'rxjs/operators'

export interface InitialState {
  count: number
}

export const initialState: InitialState = {
  count: 0,
}

export function reducer(state: InitialState, action: AnyAction) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 }
    case 'DECREMENT':
      return { count: state.count - 1 }
    default:
      return state
  }
}

// TODO: 454 page
export function createStore(rootReducer: Reducer, initialState: InitialState) {
  const actionDispatcher$ = new Subject()
  const store$ = new BehaviorSubject(initialState)

  const dispatch = actionDispatcher$.next.bind(actionDispatcher$)
  const subscribe = store$.subscribe.bind(store$)
  const getState = store$.getValue.bind(store$)

  actionDispatcher$
    .pipe(
      concatMap(action => {
        if (action instanceof Promise || action instanceof Observable) {
          return from(action)
        }
        if (typeof action === 'function') {
          action(dispatch, getState)
          return empty()
        }
        return of(action)
      }),
    )
    .pipe(scan<any, InitialState>(rootReducer, initialState))
    .subscribe(store$)

  return {
    dispatch,
    subscribe,
    getState,
  }
}

export type Store = ReturnType<typeof createStore>
