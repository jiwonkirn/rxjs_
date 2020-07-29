import React from 'react'

import { Store, InitialState } from '../ducks'

interface Props {
  store: Store
  state: InitialState
}

export default function Counter({ store, state: { count } }: Props) {
  function handleCount(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    const counterType = (e.target as HTMLButtonElement).getAttribute('data-counter-type')
    if (counterType === 'increment') {
      store.dispatch((dispatch: any) => {
        setTimeout(() => {
          dispatch({ type: 'INCREMENT' })
        }, 1000)
      })
      return
    }
    store.dispatch({ type: 'DECREMENT' })
  }
  return (
    <>
      <div>
        <button data-counter-type="decrement" onClick={handleCount}>
          감소
        </button>
        <button data-counter-type="increment" onClick={handleCount}>
          증가
        </button>
      </div>
      <div>{count}</div>
    </>
  )
}
