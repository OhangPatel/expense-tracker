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
    const { groupId } = await params;
    const requesterId = await getDataFromToken(request);

    const group = await Group.findById(groupId).populate("members", "username email");

    if (!group) {
      return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Group found successfully",
      success: true,
      group,
    });
  } catch (error: unknown) {
    console.error("Error fetching group:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "An unknown error occurred",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ groupId: string }> }
) {
  try {
    const { groupId } = await params;
    const userId = await getDataFromToken(request);

    const group = await Group.findById(groupId);
    if (!group) {
      return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }

    if (String(group.creator) !== String(userId)) {
      return NextResponse.json({ error: "Not authorized to delete this group" }, { status: 403 });
    }

    await Group.findByIdAndDelete(groupId);
    return NextResponse.json({ message: "Group deleted successfully", success: true });
  } catch (error: unknown) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : "An unknown error occurred",
    }, { status: 500 });
  }
}
