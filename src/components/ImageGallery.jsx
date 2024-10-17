import React, { useState, useEffect } from 'react';
import AuthService from '../appwrite/auth'; // Import your AuthService with getFile and getCategories functions

const ImageGallery = () => {
    const [images, setImages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch categories on component mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const fetchedCategories = await AuthService.getCategories();
                setCategories([...fetchedCategories]); // Add "All" to select all categories
                setLoading(false);
            } catch (err) {
                console.error('Error fetching categories:', err);
                setError('Failed to load categories.');
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    // Fetch images whenever the selected category changes
    useEffect(() => {
        const fetchImages = async () => {
            try {
                setLoading(true);
                const response = await AuthService.getDocuments(selectedCategory !== 'All' ? selectedCategory : null);
                if (response && response.length > 0) {
                    const imageUrls = await Promise.all(
                        response.map(async (image) => {
                            try {
                                const fileUrl = await AuthService.getFile(image.fileId);
                                return {
                                    ...image,
                                    fileUrl: fileUrl.href
                                };
                            } catch (error) {
                                console.error(`Error fetching file URL for ${image.fileId}:`, error);
                                return null;
                            }
                        })
                    );
                    setImages(imageUrls.filter((url) => url !== null)); // Filter out any nulls
                } else {
                    setImages([]); // Clear images if none found
                }
                setLoading(false);
            } catch (err) {
                console.error('Error fetching images:', err);
                setError('Failed to load images.');
                setLoading(false);
            }
        };

        fetchImages();
    }, [selectedCategory]);

    

    if (loading) {
        return <p className="text-center text-gray-500">Loading images...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6 text-center md:text-left">Categories</h2>
            
            <div className="flex flex-col md:flex-row">
                {/* Sidebar for md and larger screens */}
                <div className="hidden md:block w-1/4 pr-4">
                    <div className="bg-gray-100 p-4 rounded">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`w-full text-left py-2 px-4 mb-2 rounded ${
                                    selectedCategory === category ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Category buttons for sm screens */}
                <div className="block md:hidden mb-6">
                
                    <div className="flex justify-center space-x-4">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded ${
                                    selectedCategory === category ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Image Grid */}
                <div className="w-full md:w-3/4">
                    {images.length === 0 ? (
                        <p className="text-center text-gray-500">No images found in this category.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {images.map((image) => (
                                <div key={image.$id} className="bg-white shadow-md rounded overflow-hidden">
                                    <img 
                                        src={image.fileUrl} 
                                        alt={image.title || 'Uploaded Image'} 
                                        className="w-full h-auto object-cover"
                                    />
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold">{image.title}</h3>
                                        <p className="text-gray-600">{image.category}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ImageGallery;
