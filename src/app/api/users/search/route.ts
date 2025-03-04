// src/app/api/users/search/route.ts
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        
        // Get search query from URL params
        const url = new URL(request.url);
        const searchQuery = url.searchParams.get('query');
        
        if (!searchQuery) {
            return NextResponse.json({ 
                users: [],
                success: true
            });
        }
        
        // Search for users with exact username match, excluding the current user
        const users = await User.find({ 
            username: searchQuery, // Changed from regex to exact match
            _id: { $ne: userId } 
        }).select('username _id');
        
        return NextResponse.json({
            users,
            success: true
        });
        
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}