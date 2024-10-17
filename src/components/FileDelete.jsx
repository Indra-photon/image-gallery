import React, { useState } from 'react';
import AuthService from '../appwrite/auth'; 

function DeletePhotoForm() {
    const [fileId, setFileId] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setStatus('Deleting...');
            await AuthService.deleteDocument(fileId);
            setStatus('Photo deleted successfully!');
        } catch (error) {
            setStatus('Failed to delete photo.');
        }
    };

    return (
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8" onSubmit={handleSubmit}>
            <h3 className="text-xl font-bold mb-4">Delete Photo</h3>
            <input type="text" value={fileId} onChange={(e) => setFileId(e.target.value)} placeholder="File ID" className="mb-4 w-full p-2 border rounded" />
            <button type="submit" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete Photo</button>
            {status && <p className="mt-4 text-red-500">{status}</p>}
        </form>
    );
}

export default DeletePhotoForm;
