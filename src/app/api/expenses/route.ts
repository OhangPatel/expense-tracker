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

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
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

        return NextResponse.json({
            message: "Expenses retrieved successfully",
            success: true,
            expenses
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}