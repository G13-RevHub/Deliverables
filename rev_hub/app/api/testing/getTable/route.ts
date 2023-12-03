import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import Comment from "@/models/commentModel";
import Rate from "@/models/rateModel";
import Review from "@/models/reviewModel";
import Credential from "@/models/credentialModel";

// api usata per leggere tutti i dati dal DB

export async function POST(request: NextRequest) {
    console.warn("Retriving all data from DB")
    try {
        const req_data = await request.json()

        var res = null
        if (req_data.type === "users")
            res = await User.find()
        else if (req_data.type === "comments")
            res = await Comment.find()
        else if (req_data.type === "rates")
            res = await Rate.find()
        else if (req_data.type === "reviews")
            res = await Review.find()
        else if (req_data.type === "credentials")
            res = await Credential.find()

        if (res === null)
            return NextResponse.json({ message: "No data to return" })
        else
            return NextResponse.json({ message: `Returning all data about ${req_data.type}`, result: res })
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message },
            { status: 400 }
        )
    }
}