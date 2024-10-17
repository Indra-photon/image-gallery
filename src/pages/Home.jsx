import React, {useEffect} from 'react'
import Login from '../components/Login'
import SignUpForm from '../components/SignUpForm'
import {Link ,useNavigate} from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'
import { login as authLogin, logout as authLogOut } from '../store/authSlice'; 
import authService from '../appwrite/auth'; 
import {useDispatch} from 'react-redux'
import Header from './Header'


function Home() {
  const authStatus = useSelector(state => state.auth.status)
  const dispatch = useDispatch()

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const currentUser = await authService.getCurrentUser(); 
        if (currentUser) {
          dispatch(authLogin(currentUser.name)); 
        } else {
          dispatch(authLogOut()); 
        }
      } catch (error) {
        console.error("Error fetching user data", error);
        dispatch(authLogOut()); 
      }
    };

    checkAuthStatus();
  }, [authStatus]);
  
  
  return (
    <div>
      <h1 className="text-4xl font-extrabold text-center mt-8 pb-10 text-blue-600">
        Photo Gallery
      </h1>
      <div className = "mb-10">
        <Header />
      </div>
      {authStatus ? (
        null
      ) : (
        null
      )}
    </div>
  )
}

export default Home
