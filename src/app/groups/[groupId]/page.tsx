"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";

export default function GroupPage() {
    const router = useRouter();
    const { groupId } = useParams();
    const [group, setGroup] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGroup = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`/api/groups/${groupId}`);
                if (res.data.success) {
                    setGroup(res.data.group);
                }
            } catch (error) {
                console.error("Error fetching group:", error);
                toast.error("Error loading group details");
            } finally {
                setLoading(false);
            }
        };

        fetchGroup();
    }, [groupId]);

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

    if (!group) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Group not found</h2>
                    <Link 
                        href="/profile"
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                    >
                        Back to Profile
                    </Link>
                </div>
            </div>
        );
    }

    // Find the group creator
    const creator = group.members?.find(member => String(member._id) === String(group.creator));
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-12">
        <Toaster position="top-center" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link
              href="/profile"
              className="text-blue-500 hover:text-blue-700 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Back to Profile
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-blue-500 to-cyan-500 relative"></div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-1">
                    {group.name}
                  </h1>
                  {group.description && (
                    <p className="text-gray-600">{group.description}</p>
                  )}
                </div>
                <div className="flex items-center bg-blue-50 px-4 py-2 rounded-lg">
                  <div className="mr-3">
                    <p className="text-sm text-gray-600">Created by</p>
                    <p className="font-medium text-blue-700">
                      {creator?.username || "Unknown"}
                    </p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white text-lg font-bold">
                    {creator?.username
                      ? creator.username[0].toUpperCase()
                      : "?"}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                {/* Group Members */}
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-blue-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                    </svg>
                    Group Members ({group.members?.length || 0})
                  </h2>
                  {group.members && group.members.length > 0 ? (
                    <div className="space-y-3">
                      {group.members.map((member) => (
                        <div
                          key={member._id}
                          className="flex items-center p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white text-lg font-bold mr-3">
                            {member.username
                              ? member.username[0].toUpperCase()
                              : "U"}
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">
                              {member.username}
                            </p>
                            <p className="text-xs text-gray-500">
                              {member._id === group.creator ? (
                                <span className="text-blue-600 font-medium">
                                  Group Creator
                                </span>
                              ) : (
                                "Member"
                              )}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No members found</p>
                  )}
                </div>

                {/* Expenses Section */}
                <div className="col-span-2">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-green-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Expenses
                    </h2>
                    <div className="flex space-x-3">
                      <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-400 text-white rounded-lg hover:from-green-600 hover:to-emerald-400 transition-all shadow-md flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Add Expense
                      </button>
                      <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all shadow-md flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Settle Up
                      </button>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg shadow-inner min-h-[300px] flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 mx-auto text-gray-300 mb-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      <p>No expenses yet</p>
                      <p className="text-sm">Add an expense to get started</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}