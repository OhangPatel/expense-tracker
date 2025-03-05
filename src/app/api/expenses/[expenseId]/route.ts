import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Expense from "@/models/expenseModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function PUT(
  request: NextRequest,
  { params }: { params: { expenseId: string } }
) {
  try {
    const userId = await getDataFromToken(request);
    const { expenseId } = params; // Changed from context.params to params
    const reqBody = await request.json();
    const { title, amount, description, groupId, splitAmong } = reqBody;

    if (!title || !amount || !groupId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const expense = await Expense.findById(expenseId);
    if (!expense) {
      return NextResponse.json(
        { error: "Expense not found" },
        { status: 404 }
      );
    }

    if (String(expense.paidBy) !== String(userId)) {
      return NextResponse.json(
        { error: "Not authorized to update this expense" },
        { status: 403 }
      );
    }

    expense.title = title;
    expense.amount = amount;
    expense.description = description;
    expense.splitAmong = splitAmong || [];

    const updatedExpense = await expense.save();
    return NextResponse.json({
      message: "Expense updated successfully",
      success: true,
      expense: updatedExpense,
    });
  } catch (error: unknown) {
    console.error("Error updating expense:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { expenseId: string } }
) {
  try {
    const userId = await getDataFromToken(request);
    const { expenseId } = params; // Changed from context.params to params

    const expense = await Expense.findById(expenseId);
    if (!expense) {
      return NextResponse.json(
        { error: "Expense not found" },
        { status: 404 }
      );
    }

    if (String(expense.paidBy) !== String(userId)) {
      return NextResponse.json(
        { error: "Not authorized to delete this expense" },
        { status: 403 }
      );
    }

    await Expense.findByIdAndDelete(expenseId);
    return NextResponse.json({
      message: "Expense deleted successfully",
      success: true,
    });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 }
    );
  }
}