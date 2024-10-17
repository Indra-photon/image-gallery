import React from 'react'
import {useDispatch} from 'react-redux'
import {logout as authLogOut} from "../store/authSlice"
import authService from "../appwrite/auth"
import {useNavigate} from 'react-router-dom'

function LogoutBtn() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logoutHandler = () => {
        try {
            const logoutStatus = authService.logout()
            if (logoutStatus) {
                alert("Logged Out successfully")
                dispatch(authLogOut(logoutStatus))
                navigate("/")
            }

        } catch (error) {
            console.log(error.message);
        }
    }
  return (
    <button
    className='className="text-white font-medium hover:text-gray-300 transition duration-300"'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn