import React, { useState } from "react";

const RegistrationForm = ({ formType }) => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`${formType} Registered Successfully!`);
        console.log(formData);
    };

    return (
        <div className="bg-gray-600 p-8 max-w-md mx-auto mt-12 rounded-lg shadow-lg text-center">
            <h2 className="text-white text-3xl font-bold mb-6">Register Now</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="text-left">
                    <label htmlFor="name" className="block text-white text-sm font-bold mb-1">
                        Username
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
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
