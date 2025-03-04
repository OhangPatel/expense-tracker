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
    const [splitEqually, setSplitEqually] = useState(true);
    const [splitAmounts, setSplitAmounts] = useState<{ [key: string]: number }>(
        {}
    );

    useEffect(() => {
        if (splitEqually && groupMembers?.length > 0 && amount) {
            const equalAmount = parseFloat(amount) / groupMembers.length;
            const newSplitAmounts: { [key: string]: number } = {};

            groupMembers.forEach((member) => {
                // Make sure member._id exists and is valid
                if (member && member._id && member._id !== "undefined") {
                    newSplitAmounts[member._id] = equalAmount;
                }
            });

            setSplitAmounts(newSplitAmounts);
        }
    }, [splitEqually, groupMembers, amount]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !amount) {
            toast.error("Title and amount are required");
            return;
        }

        try {
            setLoading(true);

            // Convert splitAmounts object to array format expected by the API
            // AND filter out any invalid entries
            const splitAmong = Object.entries(splitAmounts)
                .filter(([userId, amount]) => {
                    // Ensure userId is valid and not undefined/null
                    return (
                        userId && userId !== "undefined" && userId.trim() !== ""
                    );
                })
                .map(([userId, amount]) => ({
                    user: userId,
                    amount: Number(amount),
                }));

            // Log for debugging
            console.log("Sending split among data:", splitAmong);

            const response = await axios.post("/api/expenses", {
                title,
                amount: parseFloat(amount),
                description,
                groupId,
                splitAmong,
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

    const handleSplitAmountChange = (userId: string, value: string) => {
        setSplitAmounts((prev) => ({
            ...prev,
            [userId]: parseFloat(value) || 0,
        }));
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
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

                    <div className="mb-4">
                        <div className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                id="splitEqually"
                                checked={splitEqually}
                                onChange={(e) =>
                                    setSplitEqually(e.target.checked)
                                }
                                className="mr-2"
                            />
                            <label
                                htmlFor="splitEqually"
                                className="text-gray-700 text-sm font-medium"
                            >
                                Split equally among all members
                            </label>
                        </div>

                        {!splitEqually && groupMembers.length > 0 && (
                            <div className="mt-3 border-t pt-3">
                                <p className="text-sm text-gray-600 mb-2">
                                    Custom split amounts:
                                </p>
                                {groupMembers.map((member) => (
                                    <div
                                        key={member._id}
                                        className="flex items-center justify-between mb-2"
                                    >
                                        <span className="text-sm">
                                            {member.username}
                                        </span>
                                        <input
                                            type="number"
                                            value={
                                                splitAmounts[member._id] || ""
                                            }
                                            onChange={(e) =>
                                                handleSplitAmountChange(
                                                    member._id,
                                                    e.target.value
                                                )
                                            }
                                            className="w-24 px-2 py-1 border border-gray-300 rounded-md text-sm"
                                            placeholder="0.00"
                                            step="0.01"
                                            min="0"
                                        />
                                    </div>
                                ))}
                            </div>
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
