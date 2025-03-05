// src/models/expenseModel.js
import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide an expense title"],
    },
    amount: {
        type: Number,
        required: [true, "Please provide an amount"],
    },
    description: {
        type: String,
        default: ""
    },
    paidBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
        required: true
    },
    splitAmong: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        amount: {
            type: Number,
            default: 0
        }
    }],
    date: {
        type: Date,
        default: Date.now
    }
});

const Expense = mongoose.models.Expense || mongoose.model("Expense", expenseSchema);

export default Expense;