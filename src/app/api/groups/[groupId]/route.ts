import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Group from "@/models/groupModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ groupId: string }> }
) {
    try {
        // Get userId from token instead of params
        const userId = await getDataFromToken(request);
        const { groupId } = await params;

        // Find the group and POPULATE the members
        const group = await Group.findById(groupId).populate(
            "members",
            "username email"
        );

        if (!group) {
            return NextResponse.json(
                {
                    error: "Group not found",
                },
                {
                    status: 404,
                }
            );
        }

        // Check if user is a member of the group (need to adjust since members are now objects)
        if (
            !group.members.some(
                (member: { _id: unknown }) =>
                    String(member._id) === String(userId)
            )
        ) {
            return NextResponse.json(
                {
                    error: "You don't have permission to view this group",
                },
                {
                    status: 403,
                }
            );
        }

        return NextResponse.json({
            message: "Group retrieved successfully",
            success: true,
            group,
        });
    } catch (error: unknown) {
        console.error("Error retrieving group:", error);
        return NextResponse.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : "An unknown error occurred",
            },
            {
                status: 500,
            }
        );
    }
}
