import { useState } from 'react'
import './App.css'
import Login from '../src/components/Login'
import Navbar from './components/Navbar'
import SignUpForm from './components/SignUpForm'
import {useSelector} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import Home from './pages/Home'
import Footer from './pages/Footer'

function App() {

  return (
    <>
    <div>
      <Home />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
    </>
  )
}

export default App
