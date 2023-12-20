import { connectDB } from "@/configs/dbConfig";
import Review  from "@/models/reviewModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(request: NextRequest) {
    try {
        const result = await Review.find({}).sort({ views: -1 })

        if(!result || result.length === 0) {
            return NextResponse.json({results: []})
        }
        return NextResponse.json({ results: result })
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message },
            { status: 400 }
        )
    }
}
