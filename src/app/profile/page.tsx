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
        username: "",
        email: "",
        _id: ""
    });
    const [loading, setLoading] = useState(true);
    const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
    const [newGroup, setNewGroup] = useState({
        name: "",
        description: ""
    });
    
    // Fetch user details on component mount
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                setLoading(true);
                const res = await axios.get("/api/users/me");
                setUser(res.data.data);
            } catch (error: any) {
                toast.error("Error fetching user details");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchUserDetails();
    }, []);
    
    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("Logout successful");
            router.push("/login");
        } catch (error: any) {
            toast.error(error.message);
        }
    };
    
    const handleCreateGroup = async () => {
        try {
            const response = await axios.post("/api/groups/create", newGroup);
            toast.success("Group created successfully!");
            setShowCreateGroupModal(false);
            // Refresh or update groups list
        } catch (error: any) {
            toast.error("Failed to create group");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="w-24 h-24 bg-blue-200 rounded-full mb-4"></div>
                    <div className="h-6 w-40 bg-blue-100 rounded mb-3"></div>
                    <div className="h-4 w-52 bg-gray-100 rounded"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* User Profile Header */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
                    <div className="h-32 bg-gradient-to-r from-blue-500 to-cyan-500 relative">
                        <div className="absolute -bottom-16 left-8">
                            <div className="h-32 w-32 rounded-full border-4 border-white bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white text-4xl font-bold shadow-md">
                                {user.username ? user.username[0].toUpperCase() : "U"}
                            </div>
                        </div>
                    </div>
                    <div className="pt-20 pb-6 px-8">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800">{user.username}</h1>
                                <p className="text-gray-600">{user.email}</p>
                                <p className="text-sm text-gray-500 mt-1">Member ID: {user._id}</p>
                            </div>
                            <button 
                                onClick={logout} 
                                className="mt-4 md:mt-0 px-5 py-2.5 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg shadow-md hover:from-red-600 hover:to-pink-600 transition-all flex items-center justify-center cursor-pointer"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* Groups Management */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="md:col-span-2 bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="border-b border-gray-100 p-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-bold text-gray-800">Your Groups</h2>
                                <button 
                                    onClick={() => setShowCreateGroupModal(true)}
                                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg shadow-sm hover:from-blue-600 hover:to-cyan-600 transition-all flex items-center cursor-pointer"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                    </svg>
                                    Create Group
                                </button>
                            </div>
                        </div>
                        <div className="p-6">
                            {/* This would be populated with actual groups data */}
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-100 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <p className="text-gray-500">You haven't created any expense groups yet</p>
                                <p className="text-gray-400 text-sm mt-1">Groups make it easy to split and track shared expenses</p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats Panel */}
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="border-b border-gray-100 p-6">
                            <h2 className="text-xl font-bold text-gray-800">Activity Summary</h2>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-blue-50 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700">Total Expenses</span>
                                </div>
                                <span className="font-semibold text-lg">$0.00</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-green-50 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700">Active Groups</span>
                                </div>
                                <span className="font-semibold text-lg">0</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-purple-50 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700">Settled Balances</span>
                                </div>
                                <span className="font-semibold text-lg">0</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Recent Activities */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="border-b border-gray-100 p-6">
                        <h2 className="text-xl font-bold text-gray-800">Recent Activities</h2>
                    </div>
                    <div className="p-6">
                        {/* This would be populated with actual activity data */}
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-100 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-gray-500">No recent activity to display</p>
                            <p className="text-gray-400 text-sm mt-1">Your recent transactions and group activities will appear here</p>
                            <div className="mt-6">
                                <Link href="/add-expense" 
                                    className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg shadow-sm hover:from-blue-600 hover:to-cyan-600 transition-all inline-flex items-center"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                    </svg>
                                    Add Your First Expense
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Create Group Modal */}
            {showCreateGroupModal && (
                <div className="fixed inset-0 bg-gradient-to-br from-blue-900/30 to-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-300">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl transform transition-all">
                        {/* Modal content remains the same */}
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800 bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Create New Group</h2>
                            <button 
                                onClick={() => setShowCreateGroupModal(false)}
                                className="text-gray-500 hover:text-red-500 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Group Name</label>
                                <input
                                    type="text"
                                    value={newGroup.name}
                                    onChange={(e) => setNewGroup({...newGroup, name: e.target.value})}
                                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="Enter group name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    value={newGroup.description}
                                    onChange={(e) => setNewGroup({...newGroup, description: e.target.value})}
                                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-colors"
                                    rows={3}
                                    placeholder="Describe the purpose of this group"
                                ></textarea>
                            </div>
                        </div>
                        <div className="flex justify-end space-x-3 mt-8">
                            <button 
                                onClick={() => setShowCreateGroupModal(false)}
                                className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-all"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleCreateGroup}
                                className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg shadow-md hover:shadow-lg hover:from-blue-600 hover:to-cyan-600 transition-all font-medium"
                            >
                                Create Group
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}