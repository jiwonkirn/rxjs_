import React from 'react'

import Counter from './components/Counter'
import { InitialState, Store } from './ducks'

interface Props {
  store: Store
  state: InitialState
}

function App({ store, state }: Props) {
  return (
    <div className="App">
      <Counter store={store} state={state} />
    </div>
  )
}

export default App
