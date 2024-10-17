import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import authService from '../appwrite/auth';
import {Link ,useNavigate} from 'react-router-dom'

function AddUserProfile() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const naviagte = useNavigate()

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm();


  useEffect(() => {
    async function fetchUser() {
      try {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          setUserData(currentUser);
        }
      } catch (error) {
        console.log('Appwrite service :: fetchUser :: error', error.message);
      }
    }
    fetchUser();
  }, []);

  const updateUserDetails = async (data) => {
    setError('');
    setLoading(true);
    try {
      const userData = await authService.userDetails(data);
      if (userData) {
        naviagte("/user-profile")
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form
        className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg"
        onSubmit={handleSubmit(updateUserDetails)}
      >
        <h2 className="text-3xl font-extrabold text-center text-blue-600 mb-8">
          User Profile
        </h2>

        {error && (
          <div className="mb-4 text-red-500 text-sm text-center">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="phone" className="block text-lg font-medium text-gray-700 mb-2">
            Phone
          </label>
          <input
            type="text"
            id="phone"
            className={`w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.phone ? 'border-red-500' : ''
            }`}
            {...register('phone', { required: 'Please enter your phone number' })}
          />
          {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="block text-lg font-medium text-gray-700 mb-2">
            Address
          </label>
          <input
            type="text"
            id="address"
            className={`w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.address ? 'border-red-500' : ''
            }`}
            {...register('address', { required: 'Please enter your address' })}
          />
          {errors.address && <span className="text-red-500 text-sm">{errors.address.message}</span>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Details'}
        </button>
      </form>
    </div>
  );
}

export default AddUserProfile;
