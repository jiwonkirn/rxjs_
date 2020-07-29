import React from 'react'
import { useSelector } from 'react-redux'

import { Store } from '../reducers'

const loadingStyle: React.CSSProperties = {
  background: `rgba(0,0,0,0.8) no-repeat`,
  width: '100%',
  height: '100%',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 999,
}

export default function Loading() {
  const loading = useSelector((state: Store) => state.loading)
  if (loading) {
    return null
  }
  return <div style={loadingStyle} />
}
