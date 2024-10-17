import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import authService from '../appwrite/auth';

function Profile() {
    const [userData, setuserData] = useState(null); 
    const [userDatastatus, setuserDatastatus] = useState(false); 

    const getuserData = async () => {
        try {
            const data = await authService.getUserDetails(); 
            console.log(data);
            if (data) {
                setuserData(data); 
                setuserDatastatus(true); 
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        getuserData();
    }, []); 

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-8">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
                <h2 className="text-2xl font-bold text-blue-600 text-center mb-6">User Profile</h2>
                <div className="flex justify-end mb-6">
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
                        <Link to="/add-user-profile">Add Details</Link>
                    </button>
                </div>
                {
                    userDatastatus ? (
                        <div className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded-md">
                                <p className="text-gray-700 font-medium">Phone No:</p>
                                <p className="text-gray-900">{userData.Phone}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-md">
                                <p className="text-gray-700 font-medium">Address:</p>
                                <p className="text-gray-900">{userData.Address}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center">
                            <h1 className="text-xl font-semibold text-gray-700">Hello I am ....</h1>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default Profile;
