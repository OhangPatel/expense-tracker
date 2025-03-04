//FIXME: IF REQUIRED


// src/models/groupModel.ts
import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a group name"],
    },
    description: {
        type: String,
        default: ""
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Group = mongoose.models.Group || mongoose.model("Group", groupSchema);

export default Group;