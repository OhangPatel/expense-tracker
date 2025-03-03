"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    });
    const [loading, setLoading] = React.useState(false);
    const [errors, setErrors] = React.useState({
        username: "",
        email: "",
        password: "",
        general: ""
    });

    const onSignup = async () => {
        try {
            // Clear previous errors
            setErrors({
                username: "",
                email: "",
                password: "",
                general: ""
            });
            
            // Basic validation
            if (!user.username) {
                setErrors(prev => ({...prev, username: "Username is required"}));
                return;
            }
            
            if (!user.email) {
                setErrors(prev => ({...prev, email: "Email is required"}));
                return;
            }
            
            if (!user.password) {
                setErrors(prev => ({...prev, password: "Password is required"}));
                return;
            }
            
            if (user.password.length < 6) {
                setErrors(prev => ({...prev, password: "Password must be at least 6 characters"}));
                return;
            }
            
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            
            console.log("Signup successful", response.data);
            toast.success("Account created successfully! Please log in.");
            router.push("/login");
            
        } catch (error: any) {
            console.log("Signup failed", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
            <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-2xl shadow-lg">
                <h1 className="text-4xl font-bold text-center text-white">Signup</h1>
                <hr className="my-4 border-gray-700" />
                
                {errors.general && (
                    <div className="p-3 text-sm bg-red-900/50 border border-red-500/50 text-red-200 rounded-lg">
                        {errors.general}
                    </div>
                )}
                
                <div className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-lg font-medium text-gray-300">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={user.username}
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                            placeholder="username"
                            className={`w-full px-3 py-2 mt-1 text-white bg-gray-700 border ${
                                errors.username ? "border-red-500" : "border-gray-600"
                            } rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                        />
                        {errors.username && <p className="mt-1 text-sm text-red-400">{errors.username}</p>}
                    </div>
                    
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
                        onClick={onSignup}
                        disabled={loading}
                        className={`w-full py-3 font-medium text-white transition-colors rounded-lg ${
                            loading 
                                ? "bg-indigo-700 cursor-not-allowed" 
                                : "bg-indigo-600 hover:bg-indigo-700"
                        }`}
                    >
                        {loading ? "Creating account..." : "Sign Up"}
                    </button>
                    
                    <div className="text-center text-gray-300">
                        Already have an account? 
                        <Link href="/login" className="ml-2 text-indigo-400 hover:underline">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
