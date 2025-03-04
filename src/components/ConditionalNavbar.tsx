"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function ConditionalNavbar() {
    const router = useRouter();
    const pathname = usePathname();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState("");

    // Check authentication status when the component mounts
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get('/api/users/me');
                if (response.data && response.data.data) {
                    setIsLoggedIn(true);
                    setUsername(response.data.data.username || "User");
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.log("Not authenticated");
                setIsLoggedIn(false);
            } finally {
                setLoading(false);
            }
        };
        
        checkAuth();
    }, [pathname]); // Re-check auth when pathname changes (e.g. after login/signup)

    const handleLogout = async () => {
        try {
            const response = await axios.get('/api/users/logout');
            
            if (response.data) {
                toast.success("Logged out successfully");
                setIsLoggedIn(false);
                router.push('/login');
            } else {
                toast.error("Logout failed");
            }
        } catch (error) {
            toast.error("Failed to logout");
            console.error('Logout failed', error);
        }
    };

    // Don't show navbar on login/signup pages
    if (pathname === "/login" || pathname === "/signup") {
        return null;
    }

    return (
        <nav className="flex justify-between items-center py-6 px-10 border-b shadow-sm bg-gradient-to-r from-slate-50 to-blue-50">
            <Link href="/" className="flex items-center space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v4H4V6zm0 6h12v2H4v-2z" clipRule="evenodd" />
                </svg>
                <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500">
                    Expense Manager
                </span>
            </Link>

            {loading ? (
                <div className="flex space-x-6">
                    <div className="w-24 h-10 bg-gray-100 rounded-lg animate-pulse"></div>
                    <div className="w-24 h-10 bg-gray-100 rounded-lg animate-pulse"></div>
                </div>
            ) : isLoggedIn ? (
                // User is logged in - show authenticated navigation
                <div className="flex items-center space-x-6">
                    <Link href="/profile" className="text-gray-700 hover:text-blue-600 transition-colors">
                        Dashboard
                    </Link>
                    <div className="group relative">
                        <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors">
                            <span>Hello, {username}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <div className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                            <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                Your Profile
                            </Link>
                            <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                Settings
                            </Link>
                            <button 
                                onClick={handleLogout}
                                className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                    <Link
                        href="/add-expense"
                        className="px-6 py-3 text-base bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg 
                        hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 
                        font-medium tracking-wide shadow-md hover:shadow-lg"
                    >
                        Add Expense
                    </Link>
                </div>
            ) : (
                // User is not logged in - show login/signup buttons
                <div className="space-x-6">
                    <Link
                        href="/login"
                        className="px-8 py-4 text-lg rounded-lg border-2 border-blue-400 text-blue-500 
                        hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 
                        font-medium tracking-wide shadow-sm hover:shadow-md"
                    >
                        Login
                    </Link>
                    <Link
                        href="/signup"
                        className="px-8 py-4 text-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg 
                        hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 
                        font-medium tracking-wide shadow-md hover:shadow-lg"
                    >
                        Sign Up
                    </Link>
                </div>
            )}
        </nav>
    );
}