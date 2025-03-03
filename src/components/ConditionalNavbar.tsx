// src/components/ConditionalNavbar.tsx
"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ConditionalNavbar() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(true);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get('/api/users/me');
                if (response.data.data) {
                    setIsLoggedIn(true);
                    setUsername(response.data.data.username || "User");
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                setIsLoggedIn(false);
            } finally {
                setLoading(false);
            }
        };
        
        checkAuth();
    }, []);

    const handleLogout = async () => {
        try {
            await axios.get('/api/users/logout');
            toast.success("Logged out successfully");
            setIsLoggedIn(false);
            router.push('/login');
        } catch (error) {
            toast.error("Failed to logout");
            console.error('Logout failed', error);
        }
    };

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
                // Loading state - show skeleton
                <div className="flex items-center space-x-4">
                    <div className="h-10 w-24 bg-gray-100 animate-pulse rounded-lg"></div>
                    <div className="h-10 w-24 bg-gray-100 animate-pulse rounded-lg"></div>
                </div>
            ) : isLoggedIn ? (
                // Authenticated navigation
                <div className="flex items-center space-x-4">
                    <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">
                        Dashboard
                    </Link>
                    
                    {/* User dropdown */}
                    <div className="relative">
                        <button 
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200"
                        >
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                                {username.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-medium">{username}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                        
                        {showDropdown && (
                            <>
                                {/* Overlay to capture clicks outside dropdown */}
                                <div 
                                    className="fixed inset-0 z-10" 
                                    onClick={() => setShowDropdown(false)}
                                ></div>
                                
                                {/* Dropdown menu */}
                                <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg overflow-hidden z-20 border border-gray-200">
                                    <div className="py-2">
                                        <Link href="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={() => setShowDropdown(false)}>
                                            <div className="flex items-center space-x-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                </svg>
                                                <span>My Profile</span>
                                            </div>
                                        </Link>
                                        <Link href="/settings" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={() => setShowDropdown(false)}>
                                            <div className="flex items-center space-x-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                                </svg>
                                                <span>Settings</span>
                                            </div>
                                        </Link>
                                        <hr className="my-1 border-gray-200" />
                                        <button 
                                            onClick={() => {
                                                setShowDropdown(false);
                                                handleLogout();
                                            }}
                                            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                                        >
                                            <div className="flex items-center space-x-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                                                </svg>
                                                <span>Logout</span>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    
                    {/* Add Expense button */}
                    <Link
                        href="/add-expense"
                        className="px-6 py-3 text-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg 
                        hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 
                        font-medium tracking-wide shadow-md hover:shadow-lg"
                    >
                        Add Expense
                    </Link>
                </div>
            ) : (
                // Non-authenticated navigation
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