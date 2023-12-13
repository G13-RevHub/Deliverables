import { connectDB } from "@/configs/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(request: NextRequest, { params }: { params: { text: string } }){
    try {
        const result = await User.find({ username: params.text })
        return NextResponse.json({ result: result })
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message },
            { status: 400 }
        )
    }
}
