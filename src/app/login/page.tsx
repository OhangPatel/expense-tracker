// src/app/login/page.tsx
"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
        email: "",
        password: "",
        general: ""
    });

    const onLogin = async () => {
        try {
            // Clear previous errors
            setErrors({
                email: "",
                password: "",
                general: ""
            });
            
            // Basic validation
            if (!user.email) {
                setErrors(prev => ({...prev, email: "Email is required"}));
                return;
            }
            
            if (!user.password) {
                setErrors(prev => ({...prev, password: "Password is required"}));
                return;
            }
            
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            
            if (response.data.success) {
                toast.success("Login successful");
                router.push("/dashboard");
            }
            
        } catch (error: any) {
            console.error("Login failed", error);
            
            // Handle different types of errors
            if (error.response) {
                const status = error.response.status;
                const errorMessage = error.response.data?.message || "Login failed";
                
                if (status === 400) {
                    if (errorMessage.includes("User does not exist")) {
                        setErrors(prev => ({...prev, email: "This email is not registered"}));
                        toast.error("Account not found. Please check your email or sign up.");
                    } else if (errorMessage.includes("Invalid password")) {
                        setErrors(prev => ({...prev, password: "Incorrect password"}));
                        toast.error("Incorrect password. Please try again.");
                    } else {
                        setErrors(prev => ({...prev, general: errorMessage}));
                        toast.error(errorMessage);
                    }
                } else {
                    setErrors(prev => ({...prev, general: "Login failed. Please try again later."}));
                    toast.error("Login failed. Please try again later.");
                }
            } else {
                setErrors(prev => ({...prev, general: "Network error. Please check your connection."}));
                toast.error("Connection error. Please check your internet connection.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
            <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-2xl shadow-lg">
                <h1 className="text-4xl font-bold text-center text-white">Login</h1>
                
                {errors.general && (
                    <div className="p-3 text-sm bg-red-900/50 border border-red-500/50 text-red-200 rounded-lg">
                        {errors.general}
                    </div>
                )}
                
                <div className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-lg font-medium text-gray-300">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            placeholder="abc@gmail.com"
                            className={`w-full px-3 py-2 mt-1 text-white bg-gray-700 border ${
                                errors.email ? "border-red-500" : "border-gray-600"
                            } rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                    </div>
                    
                    <div>
                        <label htmlFor="password" className="block text-lg font-medium text-gray-300">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            placeholder="********"
                            className={`w-full px-3 py-2 mt-1 text-white bg-gray-700 border ${
                                errors.password ? "border-red-500" : "border-gray-600"
                            } rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                        />
                        {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password}</p>}
                    </div>
                    
                    <button
                        onClick={onLogin}
                        disabled={loading}
                        className={`w-full py-3 font-medium text-white transition-colors rounded-lg ${
                            loading 
                                ? "bg-indigo-700 cursor-not-allowed" 
                                : "bg-indigo-600 hover:bg-indigo-700"
                        }`}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                    
                    <div className="text-center text-gray-300">
                        Don't have an account? 
                        <Link href="/signup" className="ml-2 text-indigo-400 hover:underline">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}