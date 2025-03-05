import { getDataFromToken } from "@/helpers/getDataFromToken";
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";    
import User from "@/models/userModel";

connect();

export async function GET(request: NextRequest) {

    try {
        const userID = await getDataFromToken(request);
        const user = await User.findOne({ _id: userID }).select("-password");
        return NextResponse.json({
            message: "User found",
            data: user
        })
    } catch (error: unknown) {
        return NextResponse.json({ 
            error: error instanceof Error ? error.message : 'An unknown error occurred' 
        }, { status: 500 });
    }
}