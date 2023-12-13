import { connectDB } from "@/configs/dbConfig";
import Review from "@/models/reviewModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(request: NextRequest, { params }: { params: { text: string } }){
    console.log(params.text);
    try {
        // Il controllo del tag dovrebbe essere corretto così
        const result = await Review.find({ tags: params.text })
        return NextResponse.json({ results: result })
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message },
            { status: 400 }
        )
    }
}
