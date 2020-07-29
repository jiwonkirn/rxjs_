import { createStore } from 'redux'
import rootReducer, { Store } from '../reducers'

export default function configureStore() {
  const store: Store = createStore(rootReducer)

  return store
}
