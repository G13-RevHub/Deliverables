import { connectDB } from "@/configs/dbConfig";
import { validateJWT } from "@/helpers/validateJWT";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";


connectDB();

export async function GET(request: NextRequest) {
    try {
        const user_id = await validateJWT(request)
        //retrieve the user without the password
        const user = await User.findById(user_id).select("-password")
        return NextResponse.json({ data: user })
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message },
            { status: 400 }
        )
    }
}

export async function POST(request: NextRequest) {////////////////////////////////////
    try {
        const req_data = await request.json()
        const user = await User.findOne({ id: req_data.id }).select("-password")
        return NextResponse.json({ data: user })
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message },
            { status: 400 }
        )
    }
}