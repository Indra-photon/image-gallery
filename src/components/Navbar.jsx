import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import {useDispatch} from 'react-redux'
import authService from '../appwrite/auth'
import {logout as authLogOut} from '../store/authSlice'
import {Link ,useNavigate} from 'react-router-dom'
import Login from "../components/Login"
import SignUpForm from "../components/SignUpForm"
import FileUploadForm from './FileUpload'

function Navbar() {
    const authStatus = useSelector(state => state.auth.status);
    const userData = useSelector (state => state.auth.userData)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userLogOut = async (data) =>{
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
        <header className="bg-blue-600 shadow-lg">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-6">
                    <div className="text-white text-3xl font-bold">
                        <a href="/" className="hover:text-gray-300">MyApp</a>
                    </div>
                    <div className="hidden md:flex space-x-10">
                        <a href="/" className="text-white font-medium hover:text-gray-300 transition duration-300">Home</a>
                        {authStatus ? (
                            <div className = 'md:flex space-x-10'>
                            <a href="/user-profile" className="text-white font-medium hover:text-gray-300 transition duration-300">{userData}</a>
                            <a href="/admin-panel" className="text-white font-medium hover:text-gray-300 transition duration-300">Admin Panel</a>
                            <a href="/images" className="text-white font-medium hover:text-gray-300 transition duration-300">Images</a>
                            <button className="text-white font-medium hover:text-gray-300 transition duration-300" onClick = {userLogOut}>Log Out</button>
                            </div>
                        ) : (
                            <div className="hidden md:flex space-x-10">
                                <a href="/login" className="text-white font-medium hover:text-gray-300 transition duration-300">Log In</a>
                                <a href="/sign-up" className="text-white font-medium hover:text-gray-300 transition duration-300">Sign Up</a>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div className="md:hidden bg-blue-500 py-2 px-4 space-y-1">
                <a href="/" className="block text-white font-medium py-2 hover:bg-blue-700 rounded transition duration-300">
                    Home
                </a>

                {authStatus ? (
                    <a href="/login" className="block text-white font-medium py-2 hover:bg-blue-700 rounded transition duration-300">
                        Login
                    </a>
                ) : (
                    <a href="/signup" className="block text-white font-medium py-2 hover:bg-blue-700 rounded transition duration-300">
                        Sign Up
                    </a>
                )}
            </div>
        </header>
    )
}

export default Navbar
