// "use client";
// import axios from "axios";
// import Link from "next/link";
// import React, { useState } from "react";
// import { toast } from "react-hot-toast";
// import { useRouter } from "next/navigation";

// export default function ProfilePage() {
//     const router = useRouter();
//     const [data, setData] = useState("nothing");
//     const logout = async () => {
//         try {
//             await axios.get("/api/users/logout");
//             toast.success("Logout successful");
//             router.push("/login");
//         } catch (error: any) {
//             console.log("Logout failed", error.message);

//             toast.error(error.message);
//         }
//     };

//     const getUserDetails = async () => {
//         const res = await axios.get("/api/users/me");
//         console.log(res.data);

//         setData(res.data.data._id);
//     };

//     return (
//         <div className="flex flex-col items-center justify-center h-screen">
//             <h1 className="text-4xl font-bold">Profile Page</h1>
//             <hr />
//             <p>Profile Page</p>
//             <h2 className="p-1 rounded bg-green-100 text-black ">
//                 {data === "nothing" ? (
//                     "Nothing"
//                 ) : (
//                     <Link href={`/profile/${data}`}>{data}</Link>
//                 )}
//             </h2>
//             <hr />
//             <button
//                 onClick={logout}
//                 className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
//             >
//                 Logout
//             </button>

//             <hr />
//             <button
//                 onClick={getUserDetails}
//                 className="p-2 bg-green-200 text-black rounded hover:bg-blue-700"
//             >
//                 Get User Details
//             </button>
//         </div>
//     );
// }


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
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-2xl text-gray-500">Loading profile...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-4xl mx-auto px-4">
                {/* User Profile Header */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex items-center space-x-4">
                        <div className="h-20 w-20 rounded-full bg-indigo-500 flex items-center justify-center text-white text-2xl font-bold">
                            {user.username ? user.username[0].toUpperCase() : "U"}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">{user.username}</h1>
                            <p className="text-gray-600">{user.email}</p>
                            <p className="text-sm text-gray-500">User ID: {user._id}</p>
                        </div>
                        <button 
                            onClick={logout} 
                            className="ml-auto px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                        >
                            Logout
                        </button>
                    </div>
                </div>
                
                {/* Groups Management */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Your Groups</h2>
                        <button 
                            onClick={() => setShowCreateGroupModal(true)}
                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                        >
                            Create New Group
                        </button>
                    </div>
                    <div className="space-y-4">
                        {/* This would be populated with actual groups data */}
                        <p className="text-gray-500 text-center py-8">You haven't created any groups yet</p>
                    </div>
                </div>
                
                {/* Recent Activities */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
                    <div className="space-y-4">
                        {/* This would be populated with actual activity data */}
                        <p className="text-gray-500 text-center py-8">No recent activities</p>
                    </div>
                </div>
            </div>
            
            {/* Create Group Modal */}
            {showCreateGroupModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Create New Group</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Group Name</label>
                                <input
                                    type="text"
                                    value={newGroup.name}
                                    onChange={(e) => setNewGroup({...newGroup, name: e.target.value})}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    value={newGroup.description}
                                    onChange={(e) => setNewGroup({...newGroup, description: e.target.value})}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    rows={3}
                                ></textarea>
                            </div>
                        </div>
                        <div className="flex justify-end space-x-3 mt-6">
                            <button 
                                onClick={() => setShowCreateGroupModal(false)}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleCreateGroup}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
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