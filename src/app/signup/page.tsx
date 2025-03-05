"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    });

    const [loading, setLoading] = React.useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup successful", response.data);
            toast.success("Signup successful!");
            router.push("/login");
        } catch (error: unknown) {
            let errorMessage = "An unexpected error occurred";
            
            if (error && typeof error === "object") {
                const axiosError = error as {
                    response?: { data?: { message?: string } };
                    message?: string;
                };
                errorMessage = 
                    axiosError.response?.data?.message || 
                    axiosError.message || 
                    "Signup failed";
            }
            
            console.log("Signup failed", errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
            <Toaster position="top-center" />
            <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-2xl shadow-lg">
                <h1 className="text-4xl font-bold text-center text-white">
                    Signup
                </h1>
                <hr className="my-4 border-gray-700" />

                <label
                    htmlFor="username"
                    className="block text-lg font-medium text-gray-300"
                >
                    Username
                </label>
                <input
                    type="text"
                    id="username"
                    value={user.username}
                    onChange={(e) =>
                        setUser({ ...user, username: e.target.value })
                    }
                    placeholder="username"
                    className="w-full px-3 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />

                <label
                    htmlFor="email"
                    className="block text-lg font-medium text-gray-300"
                >
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    value={user.email}
                    onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                    }
                    placeholder="abc@gmail.com"
                    className="w-full px-3 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />

                <label
                    htmlFor="password"
                    className="block text-lg font-medium text-gray-300"
                >
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    value={user.password}
                    onChange={(e) =>
                        setUser({ ...user, password: e.target.value })
                    }
                    placeholder="********"
                    className="w-full px-3 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />

                <button
                    onClick={onSignup}
                    disabled={loading}
                    className={`w-full px-4 py-2 mt-4 text-lg text-white bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg 
                ${
                    loading
                        ? "opacity-70 cursor-not-allowed"
                        : "hover:from-indigo-600 hover:to-purple-600"
                }
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                    {loading ? "Signing up..." : "Signup"}
                </button>

                <Link
                    href="/login"
                    className="block mt-4 text-lg text-center text-indigo-400 hover:underline"
                >
                    Visit login page
                </Link>

                {/* Back to Home Button */}
                <button
                    onClick={() => router.push("/")}
                    className="w-full px-4 py-2 mt-4 text-lg text-white bg-gray-700 rounded-lg hover:bg-gray-600 transition-all duration-200"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
}
