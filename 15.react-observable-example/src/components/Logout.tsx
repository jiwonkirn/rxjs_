import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Store } from '../reducers'
import { resetAuth } from '../actions'

export default function Logout() {
  const auth = useSelector((state: Store) => state.auth)
  const dispatch = useDispatch()

  function logout(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    dispatch(resetAuth())
  }
  if (!auth.username) {
    return null
  }
  return (
    <div>
      <form action="#" onSubmit={logout}>
        <div>{auth.username}님 안녕하세요!</div>
        <br />
        <button>로그아웃</button>
      </form>
    </div>
  )
}
