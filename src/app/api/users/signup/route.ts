import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import mongoose from "mongoose";

// from dbConfig.ts
connect();

export async function POST(request: NextRequest) {
    try {
        
        const reqBody = await request.json();
        const { username: rawUsername, email: rawEmail, password } = reqBody;

        const username = rawUsername.trim();
        const email = rawEmail.trim().toLowerCase();

        if (!username || !email || !password) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ message: "Please enter a valid email address" }, { status: 400 });
        }

        if (!password || password.length < 6) {
            return NextResponse.json(
                { message: "Password must be at least 6 characters" },
                { status: 400 }
            );
        }

        const existingUser = await User.findOne({
            $or: [{ username }, { email }]
        });

        if (existingUser) {
            if (existingUser.username === username) {
                return NextResponse.json({ message: "Username already taken" }, { status: 400 });
            }
            if (existingUser.email === email) {
                return NextResponse.json({ message: "Email already exists" }, { status: 400 });
            }
        }

        // Hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            isVerified: true,
        });

        const savedUser = await newUser.save();

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            user: {
                id: savedUser._id,
                username: savedUser.username,
                email: savedUser.email,
            },
        });
    } catch (error: unknown) {
        
        if (error instanceof mongoose.Error.ValidationError) {
            if (error.errors.email) {
                return NextResponse.json(
                    { message: error.errors.email.message },
                    { status: 400 }
                );
            }
            return NextResponse.json(
                { message: "Validation Error" },
                { status: 400 }
            );
        }

        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(
            { error: "An unknown error occurred" },
            { status: 500 }
        );
    }
}
