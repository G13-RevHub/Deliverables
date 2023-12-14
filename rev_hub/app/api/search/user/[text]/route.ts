import { connectDB } from "@/configs/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(request: NextRequest, { params }: { params: { text: string } }){
    try {
        const result = await User.find({ username: params.text })
        console.log("log user: ", result)
        if(!result || result.length === 0) {
            return NextResponse.json({ results: [] })
        }
        return NextResponse.json({ results: result })
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message },
            { status: 400 }
        )
    }
}
