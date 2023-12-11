import { connectDB } from "@/configs/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(request: NextRequest, { params }: { params: { text: string } }): Promise<any>{
    console.log(params.text);
    try {
        //forse non ci va user, ma qlcs di + specifico
        const result = await User.find({ username: params.text })
        return NextResponse.json({ results: params.text })
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message },
            { status: 400 }
        )
    }
    //console.log(request.nextUrl.searchParams.get("foo"));
    //return new Response("Hello from search tag");
}
