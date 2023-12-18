import { connectDB } from "@/configs/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";


connectDB();

export async function GET(request: NextRequest, { params }: { params: { id: number } }) {
    try {
        const user = await User.findOne({ id: params.id }).select("-password")
        return NextResponse.json({ data: user })
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message },
            { status: 400 }
        )
    }
}