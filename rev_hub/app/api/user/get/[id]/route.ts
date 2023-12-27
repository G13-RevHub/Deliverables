import { connectDB } from "@/configs/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";


connectDB();

export async function GET(request: NextRequest, { params }: { params: { id: number } }) {
    if (Number.isNaN(params.id) || params.id < 1)
        return NextResponse.json({ message: "Argument not valid" }, { status: 400 })
    try {
        const user = await User.findOne({ id: params.id }).select("-password")
        if (user === null)
            return NextResponse.json(
                { message: "The user doesn't exist" },
                { status: 400 }
            )
        
        return NextResponse.json({ data: user })
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message },
            { status: 400 }
        )
    }
}