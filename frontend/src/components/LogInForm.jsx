import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegistrationForm = ({ formType }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: "", email: "", password: "" });
    const [error, setError] = useState(""); //State to handle errors
    const [showPassword, setShowPassword] = useState(false); //State for showing password

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        try {
            const response = await fetch("http://localhost:5001/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData), // Use formData from state
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Sign in failed:", errorData);
                setError(errorData.message || "sign in failed"); // Set error message
                return;
            }

            const data = await response.json();
            console.log("Sign successful:", data);
            setError(""); // Clear any previous errors
            navigate("/templates"); 
        } catch (error) {
            console.error("Error during Sign in:", error);
            setError("An error occurred during Sign in."); // Set error message
        }

 
    };

    return (
        <div className="bg-gray-600 p-8 max-w-md mx-auto mt-12 rounded-lg shadow-lg text-center">
            <h2 className="text-white text-3xl font-bold mb-6">Sign In</h2>
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
                <div className="text-left relative">
                    <label htmlFor="password" className="block text-white text-sm font-bold mb-1">
                        Password
                    </label>
                    <input
                        type={showPassword ? "text" : "password"} 
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full p-3 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-yellow-400 border-none pr-10" 
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 mt-7" 
                    >
                        {showPassword ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                                />
                            </svg>
                        )}
                    </button>
                </div>
                <button type="submit" className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                    Sign In
                </button>
            </form>
        </div>
    );
};

export default RegistrationForm;