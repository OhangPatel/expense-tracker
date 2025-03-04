// src/app/api/groups/create/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Group from "@/models/groupModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function POST(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const reqBody = await request.json();
        const { name, description } = reqBody;
        
        if (!name) {
            return NextResponse.json({ error: "Group name is required" }, { status: 400 });
        }
        
        const newGroup = new Group({
            name,
            description,
            creator: userId,
            members: [userId] // Creator is also a member
        });
        
        const savedGroup = await newGroup.save();
        
        return NextResponse.json({ 
            message: "Group created successfully", 
            success: true, 
            group: savedGroup 
        });
        
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}