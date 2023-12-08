import { connectDB } from "@/configs/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";


connectDB();

export async function GET(request: NextRequest) {
    return NextResponse.json({ reviews: [] })
}