import React, { useState } from 'react';
import AuthService from '../appwrite/auth'; // Assuming the update function is part of AuthService

function UpdateDocumentForm() {
    const [fileId, setFileId] = useState(''); // To store the file ID
    const [category, setCategory] = useState(''); // To store the category
    const [title, setTitle] = useState(''); // To store the title
    const [updateStatus, setUpdateStatus] = useState(''); // To track update status

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate documentId
        if (!fileId || fileId.length > 36 || /[^a-zA-Z0-9_]/.test(fileId)) {
            setUpdateStatus('Invalid Document ID.');
            return;
        }
    
        try {
            setUpdateStatus('Updating...');
            const userId = (await AuthService.getCurrentUser()).$id; // Fetch the current user ID
            await AuthService.updateDocument(fileId, category, title, userId); // Call the updateDocument function
            setUpdateStatus('Document updated successfully!');
        } catch (error) {
            console.error('Error updating document:', error);
            setUpdateStatus('Failed to update document.');
        }
    };
    

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form 
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl font-bold mb-6">Update Document</h2>

                {/* File ID Input */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Document ID:
                    </label>
                    <input 
                        type="text" 
                        value={fileId} 
                        onChange={(e) => setFileId(e.target.value)} 
                        placeholder="Enter file ID"
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

                {/* Title Input */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Title:
                    </label>
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        placeholder="Enter title"
                        className="w-full border rounded p-2 text-gray-700"
                    />
                </div>

                <div className="flex items-center justify-between">
                    <button 
                        type="submit" 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Update
                    </button>
                </div>
                
                {updateStatus && <p className="mt-4 text-red-500">{updateStatus}</p>}
            </form>
        </div>
    );
}

export default UpdateDocumentForm;
