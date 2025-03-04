// src/app/api/groups/user/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Group from "@/models/groupModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";

// Connect to database
connect();

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        
        if (!userId) {
            return NextResponse.json({ 
                error: "Unauthorized" 
            }, { 
                status: 401 
            });
        }
        
        // Find groups where the user is a member
        const groups = await Group.find({ members: userId });
        
        return NextResponse.json({
            message: "Groups retrieved successfully",
            success: true,
            groups
        });
        
    } catch (error: any) {
        console.error("Error fetching groups:", error);
        return NextResponse.json({ 
            error: error.message 
        }, { 
            status: 500 
        });
    }
}

// Add a DELETE endpoint to delete a group
export async function DELETE(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        
        if (!userId) {
            return NextResponse.json({ 
                error: "Unauthorized" 
            }, { 
                status: 401 
            });
        }

        // Get groupId from URL search params
        const url = new URL(request.url);
        const groupId = url.searchParams.get('groupId');
        
        if (!groupId) {
            return NextResponse.json({ 
                error: "Group ID is required" 
            }, { 
                status: 400 
            });
        }

        // Find the group first to check permissions
        const group = await Group.findById(groupId);

        if (!group) {
            return NextResponse.json({ 
                error: "Group not found" 
            }, { 
                status: 404 
            });
        }

        // Check if the user is the creator of the group
        if (group.creator.toString() !== userId.toString()) {
            return NextResponse.json({ 
                error: "You don't have permission to delete this group" 
            }, { 
                status: 403 
            });
        }

        // Delete the group
        await Group.findByIdAndDelete(groupId);
        
        return NextResponse.json({
            message: "Group deleted successfully",
            success: true
        });
        
    } catch (error: any) {
        console.error("Error deleting group:", error);
        return NextResponse.json({ 
            error: error.message 
        }, { 
            status: 500 
        });
    }
}