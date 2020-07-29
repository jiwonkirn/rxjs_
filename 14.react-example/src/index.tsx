import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

import { createStore, initialState, reducer } from './ducks'
import App from './App'

const store = createStore(reducer, initialState)

store.subscribe(state =>
  ReactDOM.render(
    <React.StrictMode>
      <App store={store} state={state} />
    </React.StrictMode>,
    document.getElementById('root'),
  ),
)
