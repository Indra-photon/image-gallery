import React, { useState } from 'react';
import FileUploadForm from './FileUpload';
import UpdateDocumentForm from './FileUpdate';
import DeletePhotoForm from './FileDelete';

function AdminPanel() {
    const [activeForm, setActiveForm] = useState(null);

    const handleFormOpen = (formType) => {
        setActiveForm(formType);
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
            <h2 className="text-3xl font-bold mb-8">Admin Panel</h2>
            
            <div className="space-x-4 mb-8">
                <button 
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleFormOpen('add')}
                >
                    Add Photo
                </button>
                
                <button 
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleFormOpen('update')}
                >
                    Update Photo
                </button>
                
                <button 
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleFormOpen('delete')}
                >
                    Delete Photo
                </button>
            </div>

            <div className="w-full max-w-lg">
                {activeForm === 'add' && <FileUploadForm />}
                {activeForm === 'update' && <UpdateDocumentForm />}
                {activeForm === 'delete' && <DeletePhotoForm />}
            </div>
        </div>
    );
}

export default AdminPanel;
