import React, { useState } from 'react';
import AuthService from '../appwrite/auth'; // Assuming the upload function is part of authService or similar

function FileUploadForm() {
    const [file, setFile] = useState(null); // To store the selected file
    const [category, setCategory] = useState(''); // To store the category
    const [title, settitle] = useState('');
    const [uploadStatus, setUploadStatus] = useState(''); // To track upload status

    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // Get the selected file
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file || !category) {
            setUploadStatus('Please select a file and enter a category.');
            return;
        }
        
        try {
            setUploadStatus('Uploading...');
            const userId = await AuthService.getCurrentUser()
            await AuthService.uploadFileWithCategory(file, category, title, userId.$id);
            setUploadStatus('File uploaded successfully!');
        } catch (error) {
            console.error('Error uploading file:', error);
            setUploadStatus('Failed to upload file.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form 
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl font-bold mb-6">Upload File</h2>

                {/* File Input */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Choose File:
                    </label>
                    <input 
                        type="file" 
                        onChange={handleFileChange} 
                        className="w-full border rounded p-2 text-gray-700"
                    />
                </div>

                {/* Category Input */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Category:
                    </label>
                    <input 
                        type="text" 
                        value={category} 
                        onChange={(e) => setCategory(e.target.value)} 
                        placeholder="Enter category"
                        className="w-full border rounded p-2 text-gray-700"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Title:
                    </label>
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => settitle(e.target.value)} 
                        placeholder="Enter title"
                        className="w-full border rounded p-2 text-gray-700"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button 
                        type="submit" 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Upload
                    </button>
                </div>
                {uploadStatus && <p className="mt-4 text-red-500">{uploadStatus}</p>}
            </form>
        </div>
    );
}

export default FileUploadForm;
