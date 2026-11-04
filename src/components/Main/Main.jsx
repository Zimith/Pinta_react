import React from 'react'
import NavBar from '../NavBar/NavBar'
import { Outlet } from 'react-router-dom'
const Main = () => {
  return (
    <div>
      <NavBar></NavBar>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Main
