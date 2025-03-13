import React, { useState } from "react";

const handleNewFurniture = ({ onClose }) => {
    const [formData, setFormData] = useState({
        name: "",
        length: "",
        width: "",
        height: "",
        image: null, 
        user: ""
    });

    const [imagePreview, setImagePreview] = useState(null);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({ ...prev, image: file }));
            setImagePreview(URL.createObjectURL(file)); 
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, length, width, height, image } = formData;

        if (!name || !length || !width || !height || !image) {
            setError("Please fill out all fields and upload an image.");
            return;
        }

        let userName = window.sessionStorage.getItem("userName"); 

        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = async () => {
            const base64Image = reader.result.split(",")[1]; 

            const jsonData = {
                name,
                length: parseFloat(length),
                width: parseFloat(width),
                height: parseFloat(height),
                image: base64Image,
                user: userName
            };

            try {
                const response = await fetch("http://localhost:5001/api/furniture/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(jsonData),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error("Furniture creation failed:", errorData);
                    setError(errorData.message || "Failed to add furniture.");
                    return;
                }

                const result = await response.json();
                console.log("Furniture successfully added:", result);
                setError("");
                onClose();
            } catch (error) {
                console.error("Error during furniture creation:", error);
                setError("An error occurred while adding furniture.");
            }
        };
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-amber-10 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
                <h2 className="text-xl font-bold mb-4">Add New Furniture</h2>

                {error && <p className="text-red-500">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        type="text"
                        name="name"
                        placeholder="Furniture Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="number"
                        name="length"
                        placeholder="Length (cm)"
                        value={formData.length}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="number"
                        name="width"
                        placeholder="Width (cm)"
                        value={formData.width}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="number"
                        name="height"
                        placeholder="Height (cm)"
                        value={formData.height}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="w-full p-2 border rounded"
                    />

                    {/* Image Preview */}
                    {imagePreview && (
                        <div className="mt-3">
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="w-full h-32 object-cover rounded"
                            />
                        </div>
                    )}

                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        >
                            Submit
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default handleNewFurniture;