"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
// Added Toaster
import { Toaster } from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = React.useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login successful", response.data);
            toast.success("Login successful");
            router.push("/profile");
        } catch (error: unknown) {
            let errorMessage = "An unexpected error occurred";

            // Type checking for axios error pattern
            if (error && typeof error === "object") {
                const axiosError = error as {
                    response?: { data?: { message?: string } };
                    message?: string;
                };
                errorMessage =
                    axiosError.response?.data?.message ||
                    axiosError.message ||
                    "Login failed";
            }

            console.log("Login failed", errorMessage);
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
                    Login
                </h1>

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
                    onClick={onLogin}
                    disabled={loading}
                    className={`w-full px-4 py-2 mt-4 text-lg text-white bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg ${
                        loading
                            ? "opacity-70 cursor-not-allowed"
                            : "hover:from-indigo-600 hover:to-purple-600"
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                <Link
                    href="/signup"
                    className="block mt-4 text-lg text-center text-indigo-400 hover:underline"
                >
                    Sign Up
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
