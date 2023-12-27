import { connectDB } from "@/configs/dbConfig";
import Review  from "@/models/reviewModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(request: NextRequest, { params }: { params: { text: string } }) {
    try {

        const fuzzyRegex = new RegExp(params.text, 'iu')
        const result = await Review.find({ title: {$regex: fuzzyRegex} })

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
