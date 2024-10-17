import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import conf from '../../conf/conf';
import {useDispatch} from 'react-redux'
import authService from '../appwrite/auth';
import {login as authLogin} from '../store/authSlice'
import {Link ,useNavigate} from 'react-router-dom'

function SignUpForm() {
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate ()
    const {
        handleSubmit,
        register,
        formState : { errors }
    } = useForm();

    const create = async(data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                alert("Signed Up successfully")
                navigate("/login")
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="flex items-center justify-center">
            <form className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg" onSubmit={handleSubmit(create)}>
                <h2 className="text-3xl font-extrabold text-center text-blue-600 mb-8">
                    Sign Up
                </h2>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">
                        Name
                    </label>
                    <input 
                        type="name" 
                        id="name"
                        className={`w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : ''}`}
                        {...register("name", { required: "Please enter your name" })}
                    />
                    {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">
                        Email
                    </label>
                    <input 
                        type="email" 
                        id="email"
                        className={`w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : ''}`}
                        {...register("email", { required: "Please enter your email" })}
                    />
                    {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-lg font-medium text-gray-700 mb-2">
                        Password
                    </label>
                    <input 
                        type="password" 
                        id="password"
                        className={`w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? 'border-red-500' : ''}`}
                        {...register("password", { required: "Please enter your password" })}
                    />
                    {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                </div>

                <button 
                    type="submit" 
                    className="w-full bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
}

export default SignUpForm;
