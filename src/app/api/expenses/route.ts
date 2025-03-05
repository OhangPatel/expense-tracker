// src/app/api/expenses/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Expense from "@/models/expenseModel";
import Group from "@/models/groupModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function POST(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const reqBody = await request.json();
        const { title, amount, description, groupId, splitAmong } = reqBody;

        if (!title || !amount || !groupId) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Check if user is a member of the group
        const group = await Group.findById(groupId);
        if (!group || !group.members.includes(userId)) {
            return NextResponse.json({ error: "User is not a member of this group" }, { status: 403 });
        }

        const newExpense = new Expense({
            title,
            amount,
            description,
            paidBy: userId,
            group: groupId,
            splitAmong: splitAmong || []
        });

        const savedExpense = await newExpense.save();

        return NextResponse.json({
            message: "Expense added successfully",
            success: true,
            expense: savedExpense
        });

    } catch (error: unknown) {
        return NextResponse.json({ 
            error: error instanceof Error ? error.message : 'An unknown error occurred' 
        }, { status: 500 });
    }
}


export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const url = new URL(request.url);
        const groupId = url.searchParams.get('groupId');

        if (!groupId) {
            return NextResponse.json({ error: "Group ID is required" }, { status: 400 });
        }

        // Check if user is a member of the group
        const group = await Group.findById(groupId);
        if (!group || !group.members.includes(userId)) {
            return NextResponse.json({ error: "User is not a member of this group" }, { status: 403 });
        }

        // Get all expenses for this group
        const expenses = await Expense.find({ group: groupId })
            .populate('paidBy', 'username')
            .populate('splitAmong.user', 'username')
            .sort({ date: -1 });

        // Calculate lending/borrowing information for each expense
        const expensesWithBalances = expenses.map(expense => {
            const expenseObj = expense.toObject();
            
            // Find the current user's share in the split
            const userShare = expense.splitAmong.find((share: { user: { _id: string | object }; }) => 
                String(share.user._id) === String(userId)
            );
            
            // User's share amount or 0 if not found
            const userShareAmount = userShare ? userShare.amount : 0;
            
            // Calculate lending/borrowing status
            let balanceAmount = 0;
            let balanceType = "neutral";
            
            if (String(expense.paidBy._id) === String(userId)) {
                // Current user is the payer - they lent money to others
                balanceAmount = expense.amount - userShareAmount;
                balanceType = balanceAmount > 0 ? "lent" : "borrowed";
            } else {
                // Current user is not the payer - they borrowed money
                balanceAmount = -userShareAmount;
                balanceType = balanceAmount >= 0 ? "lent" : "borrowed";
            }

            return {
                ...expenseObj,
                balanceForCurrentUser: {
                    amount: Math.abs(balanceAmount),
                    type: balanceType
                }
            };
        });

        return NextResponse.json({
            message: "Expenses retrieved successfully",
            success: true,
            expenses: expensesWithBalances
        });

    } catch (error: unknown) {
        return NextResponse.json({ 
            error: error instanceof Error ? error.message : 'An unknown error occurred' 
        }, { status: 500 });
    }
}