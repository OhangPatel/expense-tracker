// src/components/ExpenseForm.tsx
"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

type ExpenseFormProps = {
    groupId: string;
    onSuccess: () => void;
    onCancel: () => void;
    groupMembers: any[];
};

export default function ExpenseForm({
    groupId,
    onSuccess,
    onCancel,
    groupMembers,
}: ExpenseFormProps) {
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [selectedMembers, setSelectedMembers] = useState<{ [key: string]: boolean }>({});
    const [splitAmounts, setSplitAmounts] = useState<{ [key: string]: number }>({});

    // Initialize all members as selected
    useEffect(() => {
        if (groupMembers?.length > 0) {
            const initialSelected: { [key: string]: boolean } = {};
            groupMembers.forEach(member => {
                initialSelected[member._id] = true;
            });
            setSelectedMembers(initialSelected);
        }
    }, [groupMembers]);

    // Recalculate split amounts when selected members change
    useEffect(() => {
        if (amount && parseFloat(amount) > 0) {
            const selectedMemberIds = Object.keys(selectedMembers).filter(id => selectedMembers[id]);
    
            if (selectedMemberIds.length > 0) {
                let totalAmount = parseFloat(amount);
                let equalShare = (totalAmount / selectedMemberIds.length).toFixed(2);
                
                let adjustedShares: { [key: string]: number } = {};
                let remainingCents = Math.round((totalAmount - parseFloat(equalShare) * selectedMemberIds.length) * 100);
    
                selectedMemberIds.forEach((memberId, index) => {
                    if (memberId && memberId !== "undefined") {
                        let extraCent = remainingCents > 0 ? 0.01 : 0;
                        adjustedShares[memberId] = parseFloat(equalShare) + extraCent;
                        remainingCents -= extraCent ? 1 : 0;
                    }
                });
    
                setSplitAmounts(adjustedShares);
            } else {
                setSplitAmounts({});
            }
        } else {
            setSplitAmounts({});
        }
    }, [selectedMembers, amount]);

    const handleMemberSelect = (memberId: string, isSelected: boolean) => {
        setSelectedMembers((prev) => {
            const updatedSelection = { ...prev };
            if (isSelected) {
                updatedSelection[memberId] = true;
            } else {
                delete updatedSelection[memberId]; // Remove the member from the list
            }
            return updatedSelection;
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!title || !amount) {
            toast.error("Title and amount are required");
            return;
        }

        const selectedMemberIds = Object.keys(selectedMembers).filter(
            id => selectedMembers[id]
        );
        
        if (selectedMemberIds.length === 0) {
            toast.error("Please select at least one member for the expense");
            return;
        }

        try {
            setLoading(true);
            
            // Create splitAmong array only with selected members
            const splitAmong = Object.entries(splitAmounts)
                .filter(([userId]) => selectedMembers[userId])
                .filter(([userId]) => userId && userId !== "undefined" && userId.trim() !== "")
                .map(([userId, amount]) => ({
                    user: userId,
                    amount: Number(amount)
                }));

            const response = await axios.post("/api/expenses", {
                title,
                amount: parseFloat(amount),
                description,
                groupId,
                splitAmong
            });

            if (response.data.success) {
                toast.success("Expense added successfully");
                onSuccess();
            }
        } catch (error: any) {
            console.error("Error adding expense:", error);
            toast.error(error.response?.data?.error || "Failed to add expense");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-opacity-90 backdrop-blur-xl z-50 flex items-center justify-center transition-all duration-300">
            <div className="bg-white rounded-xl p-8 w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-xl border border-gray-100">
                <h2 className="text-xl font-bold mb-8 text-black border-b pb-4 flex items-center">
                    <span className="bg-blue-100 p-2.5 rounded-lg mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                        </svg>
                    </span>
                    Add New Expense
                </h2>
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-black text-sm font-semibold mb-3">
                            Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm text-black placeholder-gray-400"
                            placeholder="Dinner, Groceries, etc."
                            required
                        />
                    </div>
                    
                    <div className="mb-6">
                        <label className="block text-black text-sm font-semibold mb-3">
                            Amount
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-black font-medium">$</span>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full pl-9 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm text-black placeholder-gray-400"
                                placeholder="0.00"
                                step="0.01"
                                min="0.01"
                                required
                            />
                        </div>
                    </div>
                    
                    <div className="mb-6">
                        <label className="block text-black text-sm font-semibold mb-3">
                            Description (Optional)
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm text-black placeholder-gray-400"
                            placeholder="Add details about this expense"
                            rows={3}
                        />
                    </div>
                    
                    {/* Enhanced Members selection */}
                    <div className="mb-6">
                        <label className="block text-black text-sm font-semibold mb-3 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-blue-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                            </svg>
                            Split equally between
                        </label>
                        <div className="border border-gray-200 rounded-lg p-5 max-h-64 overflow-y-auto bg-white shadow-inner">
                            {groupMembers.map((member, index) => {
                                // Generate different gradient colors based on index
                                const gradients = [
                                    "from-purple-600 to-indigo-400",
                                    "from-green-500 to-emerald-400",
                                    "from-amber-500 to-yellow-400",
                                    "from-red-500 to-pink-400",
                                    "from-blue-600 to-cyan-400",
                                    "from-indigo-600 to-purple-500",
                                    "from-teal-500 to-cyan-400"
                                ];
                                const gradient = gradients[index % gradients.length];
                                
                                return (
                                  <div
                                    key={member._id}
                                    className="flex items-center justify-between py-3 px-2 mb-2.5 last:mb-0 hover:bg-gray-50 rounded-lg transition-colors border-b border-gray-100 last:border-0"
                                  >
                                    <div className="flex items-center">
                                      <div
                                        className={`w-10 h-10 rounded-lg bg-gradient-to-br shadow-sm ${gradient} text-white flex items-center justify-center mr-3 text-sm font-bold`}
                                      >
                                        {member.username
                                          .substring(0, 2)
                                          .toUpperCase()}
                                      </div>
                                      <span className="text-base font-medium text-gray-800">
                                        {member.username}
                                      </span>
                                    </div>

                                    <div className="flex items-center">
                                      {selectedMembers[member._id] &&
                                        splitAmounts[member._id] && (
                                          <span className="text-blue-600 font-semibold text-sm bg-blue-50 px-3 py-1.5 rounded-md mr-4">
                                            $
                                            {splitAmounts[member._id].toFixed(
                                              2
                                            )}
                                          </span>
                                        )}

                                      <div className="relative">
                                        <input
                                          type="checkbox"
                                          checked={
                                            !!selectedMembers[member._id]
                                          }
                                          onChange={() =>
                                            handleMemberSelect(
                                              member._id,
                                              !selectedMembers[member._id]
                                            )
                                          }
                                          className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />

                                        
                                      </div>
                                    </div>
                                  </div>
                                );
                            })}
                        </div>
                        {Object.keys(selectedMembers).filter(id => selectedMembers[id]).length > 0 && amount && (
                            <div className="flex items-center bg-blue-50 p-4 rounded-lg mt-4 border border-blue-100">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600 mr-3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-sm text-blue-700 font-medium">
                                    Each selected person will pay ${(parseFloat(amount) / 
                                        Object.keys(selectedMembers).filter(id => selectedMembers[id]).length).toFixed(2)}
                                </p>
                            </div>
                        )}
                    </div>
                    
                    <div className="flex justify-end space-x-4 mt-8 pt-4 border-t">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-6 py-3 text-black border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:from-blue-400 disabled:to-blue-500 transition-all font-medium shadow-md"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    </svg>
                                    Adding...
                                </span>
                            ) : "Add Expense"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}