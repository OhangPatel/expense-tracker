// src/app/api/users/[userId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function GET(
    request: NextRequest,
    { params }: { params: { userId: string } }
) {
    try {
        await getDataFromToken(request); // Just to verify the user is authenticated
        const { userId } = params;

        // Find the user
        const user = await User.findById(userId).select("-password");

        if (!user) {
            return NextResponse.json(
                {
                    error: "User not found",
                },
                {
                    status: 404,
                }
            );
        }

        return NextResponse.json({
            message: "User retrieved successfully",
            success: true,
            data: user,
        });
    } catch (error: any) {
        console.error("Error retrieving user:", error);
        return NextResponse.json(
            {
                error: error.message,
            },
            {
                status: 500,
            }
        );
    }
}
