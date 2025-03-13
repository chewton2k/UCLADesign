import React, { useState } from "react";

const HandleNewFurniture = ({ onClose }) => {
    const [formData, setFormData] = useState({
        name: "",
        length: "",
        width: "",
        height: "",
        user: ""
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, length, width, height } = formData;

        if (!name || !length || !width || !height) {
            setError("Please fill out all fields.");
            return;
        }

        let userName = window.sessionStorage.getItem("userName");

        const jsonData = {
            name,
            length: parseFloat(length),
            width: parseFloat(width),
            height: parseFloat(height),
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

    return (
        <div className="bg-amber-10 flex items-center justify-center z-50">
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
                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default HandleNewFurniture;
