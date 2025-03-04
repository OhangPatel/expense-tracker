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
        const { name, description, members } = reqBody;

        if (!name) {
            return NextResponse.json({ error: "Group name is required" }, { status: 400 });
        }

        // Ensure the creator is in the members array
        const uniqueMembers = new Set(members);
        uniqueMembers.add(userId);

        const newGroup = new Group({
            name,
            description,
            creator: userId,
            members: Array.from(uniqueMembers),
        });

        const savedGroup = await newGroup.save();

        return NextResponse.json({
            message: "Group created successfully",
            success: true,
            group: savedGroup,
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}