"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface User {
    _id: string;
    username: string;
    email?: string;
}

interface Group {
    _id: string;
    name: string;
    description?: string;
    creator?: string;
    members?: Array<User | string>;
}

export default function ProfilePage() {
    const router = useRouter();

    // State variables
    const [user, setUser] = useState({ username: "", email: "", _id: "" });
    const [groups, setGroups] = useState<Group[]>([]);
    const [loading, setLoading] = useState(true);
    const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
    const [newGroup, setNewGroup] = useState({ name: "", description: "" });
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<User[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

    // Fetch user groups
    const fetchGroups = async () => {
        try {
            const res = await axios.get("/api/groups/user");
            if (res.data.success) {
                setGroups(res.data.groups);
            }
        } catch (error) {
            console.error("Error fetching groups:", error);
        }
    };

    // Delete a group
    const deleteGroup = async (groupId: string) => {
        if (window.confirm("Are you sure you want to delete this group?")) {
            try {
                const response = await axios.delete(
                    `/api/groups/user?groupId=${groupId}`
                );
                if (response.data.success) {
                    toast.success("Group deleted successfully");
                    fetchGroups();
                }
            } catch (error: unknown) {
                console.error("Error deleting group:", error);
                toast.error("Failed to delete the group");
            }
        }
    };

    // Search for users
    const searchUsers = async (query: string) => {
        if (!query.trim()) {
            setSearchResults([]);
            return;
        }

        // Rest of your function
        try {
            const response = await axios.get(
                `/api/users/search?query=${query}`
            );
            if (response.data.success) {
                setSearchResults(response.data.users);

                // Check if no users were found with the exact username
                if (response.data.users.length === 0) {
                    toast.error(`Username "${query}" not found`);
                }
            }
        } catch (error) {
            console.error("Error searching users:", error);
            toast.error("Error searching for users");
        }
    };

    // User selection functions
    const selectUser = (user: { _id: string; username: string }) => {
        if (!selectedUsers.find((u) => u._id === user._id)) {
            setSelectedUsers([...selectedUsers, user]);
        }
    };

    const removeUser = (userId: string) => {
        setSelectedUsers(selectedUsers.filter((u) => u._id !== userId));
    };

    // Create new group
    const handleCreateGroup = async () => {
        try {
            await axios.post("/api/groups/create", {
                ...newGroup,
                members: selectedUsers.map((user) => user._id),
            });

            toast.success("Group created successfully!");
            setShowCreateGroupModal(false);
            setNewGroup({ name: "", description: "" });
            setSelectedUsers([]);
            fetchGroups();
        } catch (error: unknown) {
            console.error("Error creating group:", error);
            toast.error("Failed to create group");
        }
    };

    // Logout function
    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("Logout successful");
            router.push("/login");
        } catch (error: unknown) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "An error occurred during logout"
            );
        }
    };

    // Reset modal state
    const closeModal = () => {
        setShowCreateGroupModal(false);
        setNewGroup({ name: "", description: "" });
        setSelectedUsers([]);
        setSearchQuery("");
        setSearchResults([]);
    };

    // Initialize data
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Fetch user details
                const userRes = await axios.get("/api/users/me");
                setUser(userRes.data.data);

                // Fetch groups
                await fetchGroups();
            } catch (error) {
                toast.error("Error fetching user data");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Loading state
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
            <Toaster position="top-center" />
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* User Profile Header */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
                    <div className="h-32 bg-gradient-to-r from-blue-500 to-cyan-500 relative">
                        <div className="absolute -bottom-16 left-8">
                            <div className="h-32 w-32 rounded-full border-4 border-white bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white text-4xl font-bold shadow-md">
                                {user.username
                                    ? user.username[0].toUpperCase()
                                    : "U"}
                            </div>
                        </div>
                    </div>
                    <div className="pt-20 pb-6 px-8">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800">
                                    {user.username}
                                </h1>
                                <p className="text-gray-600">{user.email}</p>
                                <p className="text-sm text-gray-500 mt-1">
                                    Member ID: {user._id}
                                </p>
                            </div>
                            <button
                                onClick={logout}
                                className="mt-4 md:mt-0 px-5 py-2.5 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg shadow-md hover:from-red-600 hover:to-pink-600 transition-all flex items-center justify-center cursor-pointer"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 mr-2"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                    />
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
                                <h2 className="text-xl font-bold text-gray-800">
                                    Your Groups
                                </h2>
                                <button
                                    onClick={() =>
                                        setShowCreateGroupModal(true)
                                    }
                                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg shadow-sm hover:from-blue-600 hover:to-cyan-600 transition-all flex items-center cursor-pointer"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 mr-1"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    Create Group
                                </button>
                            </div>
                        </div>
                        <div className="p-6">
                            {groups.length > 0 ? (
                                <div className="space-y-4">
                                    {groups.map((group) => (
                                        <Link
                                            key={group._id}
                                            href={`/groups/${group._id}`}
                                            className="block bg-gray-50 rounded-lg p-4 border border-gray-100 hover:shadow-md transition-shadow"
                                        >
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <h3 className="font-semibold text-gray-800">
                                                        {group.name}
                                                    </h3>
                                                    {group.description && (
                                                        <p className="text-sm text-gray-500 mt-1">
                                                            {group.description}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            deleteGroup(
                                                                group._id
                                                            );
                                                        }}
                                                        className="p-2 bg-red-50 rounded-lg text-red-500 hover:bg-red-100 transition-colors"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-5 w-5"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="flex items-center mt-3 text-xs text-gray-500">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-4 w-4 mr-1"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                                    />
                                                </svg>
                                                <span>
                                                    {group.members?.length || 1}{" "}
                                                    member
                                                    {(group.members?.length ||
                                                        1) > 1
                                                        ? "s"
                                                        : ""}
                                                </span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-16 w-16 text-blue-100 mb-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                    <p className="text-gray-500">
                                        You haven&apos;t created any expense
                                        groups yet
                                    </p>
                                    <p className="text-gray-400 text-sm mt-1">
                                        Groups make it easy to split and track
                                        shared expenses
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quick Stats Panel */}
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="border-b border-gray-100 p-6">
                            <h2 className="text-xl font-bold text-gray-800">
                                Activity Summary
                            </h2>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-blue-50 rounded-lg">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 text-blue-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                                            />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700">
                                        Total Expenses
                                    </span>
                                </div>
                                <span className="font-semibold text-lg">
                                    $0.00
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-green-50 rounded-lg">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 text-green-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                            />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700">
                                        Active Groups
                                    </span>
                                </div>
                                <span className="font-semibold text-lg">
                                    {groups.length}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Create Group Modal */}
                {showCreateGroupModal && (
                    <div className="fixed inset-0 bg-gradient-to-br from-blue-900/30 to-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-300">
                        <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl transform transition-all">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                                    Create New Group
                                </h2>
                                <button
                                    onClick={closeModal}
                                    className="text-gray-500 hover:text-red-500 transition-colors"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Group Name
                                    </label>
                                    <input
                                        type="text"
                                        value={newGroup.name}
                                        onChange={(e) =>
                                            setNewGroup({
                                                ...newGroup,
                                                name: e.target.value,
                                            })
                                        }
                                        className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder-gray-600 text-gray-600"
                                        placeholder="Enter group name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        value={newGroup.description}
                                        onChange={(e) =>
                                            setNewGroup({
                                                ...newGroup,
                                                description: e.target.value,
                                            })
                                        }
                                        className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-colors placeholder-gray-600 text-gray-600"
                                        rows={3}
                                        placeholder="Describe the purpose of this group"
                                    />
                                </div>

                                {/* User Search Section */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Add Members
                                    </label>
                                    <div className="flex items-center space-x-2 mb-4">
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) =>
                                                setSearchQuery(e.target.value)
                                            } // Only update state, don't search yet
                                            className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder-gray-600 text-gray-600"
                                            placeholder="Search for users by username..."
                                        />

                                        <button
                                            onClick={() =>
                                                searchUsers(searchQuery)
                                            }
                                            className="px-5 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg shadow-sm hover:from-blue-600 hover:to-cyan-600 transition-all"
                                        >
                                            Search
                                        </button>
                                    </div>

                                    {/* Display search results */}
                                    {searchResults.length > 0 && (
                                        <div className="max-h-40 overflow-y-auto border border-gray-200 rounded-md mb-4">
                                            {searchResults.map((user) => (
                                                <div
                                                    key={user._id}
                                                    className="flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer"
                                                    onClick={() =>
                                                        selectUser(user)
                                                    }
                                                >
                                                    <span className="text-gray-700">
                                                        {user.username}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        className="text-blue-500 hover:text-blue-700"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            selectUser(user);
                                                        }}
                                                    >
                                                        Add
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Display selected users */}
                                    {selectedUsers.length > 0 && (
                                        <div className="mt-4">
                                            <p className="text-sm font-medium text-gray-700 mb-2">
                                                Selected Members:
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedUsers.map((user) => (
                                                    <div
                                                        key={user._id}
                                                        className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                                                    >
                                                        {user.username}
                                                        <button
                                                            type="button"
                                                            className="ml-1 text-blue-500 hover:text-blue-700"
                                                            onClick={() =>
                                                                removeUser(
                                                                    user._id
                                                                )
                                                            }
                                                        >
                                                            &times;
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex justify-end space-x-3 mt-8">
                                <button
                                    onClick={closeModal}
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
        </div>
    );
}
