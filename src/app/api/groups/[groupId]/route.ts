import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Group from "@/models/groupModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function GET(request: NextRequest, { params }: { params: { groupId: string } }) {
    try {
        const userId = await getDataFromToken(request);
        
        if (!userId) {
            return NextResponse.json({ 
                error: "Unauthorized" 
            }, { 
                status: 401 
            });
        }
        
        // Use the groupId from params - no need to await since it's directly accessible
        const { groupId } =  await params;
        
        // Find the group and populate member details
        const group = await Group.findById(groupId)
            .populate('members', 'username email')
            .populate('creator', 'username ');
        
        if (!group) {
            return NextResponse.json({ 
                error: "Group not found" 
            }, { 
                status: 404 
            });
        }
        
        // Check if user is a member of the group
        if (!group.members.some(member => member._id.toString() === userId.toString())) {
            return NextResponse.json({ 
                error: "You don't have permission to view this group" 
            }, { 
                status: 403 
            });
        }
        
        return NextResponse.json({
            message: "Group retrieved successfully",
            success: true,
            group
        });
        
    } catch (error: any) {
        console.error("Error fetching group:", error);
        return NextResponse.json({ 
            error: error.message 
        }, { 
            status: 500 
        });
    }
}