import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import Review from "@/models/reviewModel";
import { connectDB } from "@/configs/dbConfig";
import { validateJWT } from "@/helpers/validateJWT";

connectDB();

export async function POST(request: NextRequest) {
    try {
        // makes sure the user is logged
        const user_id = await validateJWT(request)
        const user = await User.findById(user_id)
        if (!user)
            throw new Error("User not logged")

        const req_data = await request.json()

        // new review data
        var id = 1
        const reviews = await Review.find({})
        const len = reviews.length
        id = len + 1
        const new_review_data = {
            id: id,
            ... req_data,
            date: new Date(),
            views: 0
        }

        const new_review = new Review(new_review_data)
        //console.log(new_review)
        const x = await new_review.save()
        //console.log(x)

        return NextResponse.json({ message: "Review created successfully" })
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message },
            { status: 400 }
        )
    }
}