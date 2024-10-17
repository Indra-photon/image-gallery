import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import { login as authLogin } from '../store/authSlice';
import { useForm } from 'react-hook-form';
import authService from '../appwrite/auth';
import {Link, useNavigate} from 'react-router-dom'


function Login() {

  const [error, setError] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
      handleSubmit,
      register,
      formState : { errors }
  } = useForm();

  const userLogin = async(data) => {
    setError("")
    try {
        const session = await authService.login(data)
        if (session) {
            const userData = await authService.getCurrentUser()
            if (userData) {
                alert("logged in successfully")
                dispatch(authLogin(userData.name));
                navigate("/")
            }
        }
    } catch (error) {
        setError(error.message)
    }
}



  return (
    <div className="flex items-center justify-center">
            <form 
                className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg"
                onSubmit={handleSubmit(userLogin)}
            >
                <h2 className="text-3xl font-extrabold text-center text-blue-600 mb-8">
                    Log In
                </h2>
                <div className="mb-4">
                    <label htmlFor="login-email" className="block text-lg font-medium text-gray-700 mb-2">
                        Email
                    </label>
                    <input 
                        type="email" 
                        id="login-email"
                        className={`w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : ''}`}
                        {...register("email", { required: "Please enter your email" })}
                    />
                    {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                </div>
                <div className="mb-6">
                    <label htmlFor="login-password" className="block text-lg font-medium text-gray-700 mb-2">
                        Password
                    </label>
                    <input 
                        type="password" 
                        id="login-password"
                        className={`w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? 'border-red-500' : ''}`}
                        {...register("password", { required: "Please enter your password" })}
                    />
                    {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                </div>

                <button 
                    type="submit" 
                    className="w-full bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
                >
                    Log In
                </button>
            </form>
            
    </div>
  )
}

export default Login
