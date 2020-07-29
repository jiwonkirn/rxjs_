import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { Store } from '../reducers'

// import { getAuth } from '../actions'

function getAuth(username: string, password: string) {}

export default function Login() {
  const auth = useSelector((state: Store) => state.auth)
  const [{ username, password }, setLoginState] = useState({
    username: '',
    password: '',
  })

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target

    setLoginState({ ...{ username, password }, [name]: value })
  }

  function login(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    getAuth(username, password)
  }

  if (auth) {
    return null
  }

  return (
    <div>
      <form action="#" onSubmit={e => e.preventDefault()}>
        <label htmlFor="username">username</label>
        <input type="input" name="username" onChange={handleInputChange} id="username" />
        <br />
        <label htmlFor="password">password</label>
        <input type="password" name="password" onChange={handleInputChange} id="password" />
        <br />
        <button disabled={!username && !password} onClick={login}>
          로그인
        </button>
      </form>
    </div>
  )
}
