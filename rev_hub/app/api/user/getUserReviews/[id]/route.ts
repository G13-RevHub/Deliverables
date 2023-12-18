import { connectDB } from "@/configs/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Review from "@/models/reviewModel";


connectDB();

export async function GET(request: NextRequest, { params }: { params: { id: number } }) {
    try {
        const reviews = await Review.find({ author_id: params.id })
        return NextResponse.json({ reviews: reviews })
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message },
            { status: 400 }
        )
    }
}