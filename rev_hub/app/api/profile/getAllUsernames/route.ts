import { connectDB } from "@/configs/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

//connectDB();

export async function GET() {
    const usernames:string[] = []
    const users = await User.find({})
    users.forEach(user => {
        usernames.push(user.username)
    })
    return NextResponse.json({ usernames: usernames })
}