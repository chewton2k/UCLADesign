import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegistrationForm = ({ formType }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: "", email: "", password: "" });
    const [error, setError] = useState(""); // State to handle errors

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        try {
            const response = await fetch("http://localhost:5001/api/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData), // Use formData from state
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Registration failed:", errorData);
                setError(errorData.message || "Registration failed"); // Set error message
                return;
            }

            const data = await response.json();
            console.log("Registration successful:", data);
            setError(""); // Clear any previous errors
            navigate("/templates"); 
        } catch (error) {
            console.error("Error during registration:", error);
            setError("An error occurred during registration."); // Set error message
        }
    };

    return (
        <div className="bg-gray-600 p-8 max-w-md mx-auto mt-12 rounded-lg shadow-lg text-center">
            <h2 className="text-white text-3xl font-bold mb-6">Register Now</h2>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="text-left">
                    <label htmlFor="username" className="block text-white text-sm font-bold mb-1">
                        Username
                    </label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className="w-full p-3 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-yellow-400 border-none"
                    />
                </div>
                <div className="text-left">
                    <label htmlFor="email" className="block text-white text-sm font-bold mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-3 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-yellow-400 border-none"
                    />
                </div>
                <div className="text-left">
                    <label htmlFor="password" className="block text-white text-sm font-bold mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full p-3 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-yellow-400 border-none"
                    />
                </div>
                <button type="submit" className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                    Register
                </button>
            </form>
        </div>
    );
};

export default RegistrationForm;