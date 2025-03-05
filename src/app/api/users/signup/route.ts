import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";    
import bcryptjs from "bcryptjs";
// import { sendEmail } from "@/helpers/mailer";


connect()


export async function POST(request: NextRequest) {
    try{
        const reqBody = await request.json()
        const {username, email, password} = reqBody

        // Check if username already exists
        const existingUsername = await User.findOne({username})
        if(existingUsername){
            return NextResponse.json({message: "Username already taken"}, {status: 400})
        }

        // Check if email already exists
        const existingEmail = await User.findOne({email})
        if(existingEmail){
            return NextResponse.json({message: "Email already exists"}, {status: 400})
        }

        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser  = new User({
            username,
            email,
            password: hashedPassword,
            isVerified: true  // Automatically verify users
        })
        const savedUser = await newUser.save()
        console.log(savedUser);

        // send verification email
        // await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})
        
        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })

    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({error: error.message}, {status: 500});
        }
        return NextResponse.json({error: "An unknown error occurred"}, {status: 500});
    }
}