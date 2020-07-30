import React from 'react'

import Header from './components/Header'
import Loading from './components/Loading'
import ErrorMessage from './components/ErrorMessage'
import Login from './components/Login'
import Logout from './components/Logout'

function App() {
  return (
    <div className="App">
      <Header />
      <Loading />
      <ErrorMessage />
      <Login />
      <Logout />
    </div>
  )
}

export default App
