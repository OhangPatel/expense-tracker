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
            const initialSelected = {};
            groupMembers.forEach(member => {
                initialSelected[member._id] = true;
            });
            setSelectedMembers(initialSelected);
        }
    }, [groupMembers]);

    // Recalculate split amounts when selected members change
    useEffect(() => {
        if (amount) {
            const selectedMemberIds = Object.keys(selectedMembers).filter(
                id => selectedMembers[id]
            );
            
            if (selectedMemberIds.length > 0) {
                const equalAmount = parseFloat(amount) / selectedMemberIds.length;
                const newSplitAmounts: { [key: string]: number } = {};

                selectedMemberIds.forEach(memberId => {
                    if (memberId && memberId !== "undefined") {
                        newSplitAmounts[memberId] = equalAmount;
                    }
                });
                
                setSplitAmounts(newSplitAmounts);
            }
        }
    }, [selectedMembers, amount]);

    const handleMemberSelect = (memberId: string, isSelected: boolean) => {
        setSelectedMembers(prev => ({
            ...prev,
            [memberId]: isSelected
        }));
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
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">Add New Expense</h2>
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Dinner, Groceries, etc."
                            required
                        />
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-1">
                            Amount
                        </label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="0.00"
                            step="0.01"
                            min="0.01"
                            required
                        />
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-1">
                            Description (Optional)
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Add details about this expense"
                        />
                    </div>
                    
                    {/* Members selection */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                            Split equally between
                        </label>
                        <div className="border rounded-md p-3 max-h-60 overflow-y-auto">
                            {groupMembers.map(member => (
                                <div key={member._id} className="flex items-center mb-2 last:mb-0">
                                    <input
                                        type="checkbox"
                                        id={`member-${member._id}`}
                                        checked={selectedMembers[member._id] || false}
                                        onChange={(e) => handleMemberSelect(member._id, e.target.checked)}
                                        className="mr-2"
                                    />
                                    <label htmlFor={`member-${member._id}`} className="text-sm text-gray-700">
                                        {member.username} {selectedMembers[member._id] && splitAmounts[member._id] && 
                                            `($${splitAmounts[member._id].toFixed(2)})`}
                                    </label>
                                </div>
                            ))}
                        </div>
                        {Object.keys(selectedMembers).filter(id => selectedMembers[id]).length > 0 && amount && (
                            <p className="text-sm text-gray-600 mt-2">
                                Each selected person will pay ${(parseFloat(amount) / 
                                    Object.keys(selectedMembers).filter(id => selectedMembers[id]).length).toFixed(2)}
                            </p>
                        )}
                    </div>
                    
                    <div className="flex justify-end space-x-3 mt-6">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
                            disabled={loading}
                        >
                            {loading ? "Adding..." : "Add Expense"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}