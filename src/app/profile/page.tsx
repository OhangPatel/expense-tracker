// src/app/profile/page.tsx
"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState({
        _id: "",
        username: "",
        email: "",
        isVerified: false,
        createdAt: ""
    });
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalExpenses: 0,
        totalGroups: 0,
        joinedOn: ""
    });

    useEffect(() => {
        getUserDetails();
    }, []);

    const getUserDetails = async () => {
        try {
            setLoading(true);
            const res = await axios.get("/api/users/me");
            const userData = res.data.data;
            
            setUser({
                _id: userData._id,
                username: userData.username || "",
                email: userData.email || "",
                isVerified: userData.isVerified || false,
                createdAt: userData.createdAt || new Date().toISOString()
            });
            
            // Format the date for display
            const joinDate = new Date(userData.createdAt || new Date());
            const formattedDate = joinDate.toLocaleDateString('en-US', {
                year: 'numeric', 
                month: 'long', 
                day: 'numeric'
            });
            
            // In a real app, you would fetch these stats from your API
            setStats({
                totalExpenses: Math.floor(Math.random() * 50), // Placeholder
                totalGroups: Math.floor(Math.random() * 10), // Placeholder
                joinedOn: formattedDate
            });
            
        } catch (error) {
            console.error("Failed to fetch user details", error);
            toast.error("Couldn't load profile data");
            // Redirect to login if not authenticated
            router.push("/login");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            const response = await axios.get("/api/users/logout");
            
            if (response.data.success) {
                toast.success("Logout successful");
                router.push("/login");
            } else {
                toast.error("Logout failed");
            }
        } catch (error) {
            console.error("Logout failed", error);
            toast.error("Logout failed");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="w-32 h-32 bg-blue-200 rounded-full mb-4"></div>
                    <div className="h-8 w-48 bg-blue-200 rounded mb-4"></div>
                    <div className="h-4 w-64 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 w-56 bg-gray-200 rounded"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Profile Header */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="h-32 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                    <div className="relative px-6 pb-6">
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between">
                            <div className="flex items-end">
                                <div className="absolute -top-16 bg-white p-2 rounded-full shadow-lg">
                                    <div className="w-28 h-28 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white text-5xl font-bold">
                                        {user.username.charAt(0).toUpperCase()}
                                    </div>
                                </div>
                                <div className="ml-36 pt-4">
                                    <h1 className="text-3xl font-bold text-gray-800">{user.username}</h1>
                                    <p className="text-gray-600">{user.email}</p>
                                </div>
                            </div>
                            <div className="mt-6 md:mt-0 flex space-x-3">
                                <Link 
                                    href="/settings" 
                                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg flex items-center transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                    </svg>
                                    Settings
                                </Link>
                                <button 
                                    onClick={handleLogout} 
                                    className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg flex items-center transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                                    </svg>
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Total Expenses</p>
                            <p className="text-2xl font-bold text-gray-800">{stats.totalExpenses}</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Active Groups</p>
                            <p className="text-2xl font-bold text-gray-800">{stats.totalGroups}</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Member Since</p>
                            <p className="text-2xl font-bold text-gray-800">{stats.joinedOn}</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Recent Activity Section */}
                <div className="mt-8 bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="border-b border-gray-200 p-6">
                        <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {/* If real data available, map through activities here */}
                        <div className="p-6 flex items-start">
                            <div className="flex-shrink-0 mr-4">
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-800">Created a new expense</h3>
                                <p className="text-gray-600 text-sm">Added "Dinner with friends" expense - $45.00</p>
                                <p className="text-gray-400 text-xs mt-1">2 days ago</p>
                            </div>
                        </div>
                        <div className="p-6 flex items-start">
                            <div className="flex-shrink-0 mr-4">
                                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-800">Joined a new group</h3>
                                <p className="text-gray-600 text-sm">You joined "Weekend Trip" group</p>
                                <p className="text-gray-400 text-xs mt-1">1 week ago</p>
                            </div>
                        </div>
                        <div className="p-6 flex items-start">
                            <div className="flex-shrink-0 mr-4">
                                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-800">Settled a balance</h3>
                                <p className="text-gray-600 text-sm">Mark paid you $32.50</p>
                                <p className="text-gray-400 text-xs mt-1">2 weeks ago</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <Link 
                        href="/dashboard" 
                        className="py-3 px-6 bg-white border border-gray-200 rounded-lg shadow-sm text-gray-700 flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
                        </svg>
                        Go to Dashboard
                    </Link>
                    <Link 
                        href="/add-expense" 
                        className="py-3 px-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg flex items-center justify-center hover:from-blue-600 hover:to-cyan-600 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                        </svg>
                        Add New Expense
                    </Link>
                </div>
            </div>
        </div>
    );
}