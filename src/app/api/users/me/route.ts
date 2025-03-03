// src/app/api/users/me/route.ts
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";    
import User from "@/models/userModel";

export async function GET(request: NextRequest) {
    try {
        // Establish database connection
        await connect();
        
        // Get user ID from token
        const userId = await getDataFromToken(request);
        
        // Handle case where token is invalid or missing
        if (!userId) {
            return NextResponse.json({ 
                error: "Unauthorized - Invalid token" 
            }, { 
                status: 401 
            });
        }

        // Find user data
        const user = await User.findOne({ _id: userId }).select("-password");
        
        // Handle case where user doesn't exist
        if (!user) {
            return NextResponse.json({ 
                error: "User not found" 
            }, { 
                status: 404 
            });
        }

        // Return user data
        return NextResponse.json({
            message: "User found",
            data: user,
            success: true
        });
    } catch (error: any) {
        console.error("Error in /api/users/me:", error);
        
        // Return appropriate error message
        return NextResponse.json({ 
            error: error.message || "Internal server error",
            success: false
        }, { 
            status: 500 
        });
    }
}