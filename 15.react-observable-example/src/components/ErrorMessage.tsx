import React from 'react'
import { useSelector } from 'react-redux'

import { Store } from '../reducers'

export default function ErrorMessage() {
  const errorMessage = useSelector((state: Store) => state.errorMessage)
  if (!errorMessage) {
    return null
  }
  return <div>{errorMessage}</div>
}
