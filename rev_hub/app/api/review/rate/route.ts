import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import Rate from "@/models/rateModel";

import { validateJWT } from "@/helpers/validateJWT";
import { connectDB } from "@/configs/dbConfig";

connectDB();

async function changeRate(author_id: number, review_id: number, new_rate: boolean): Promise<void> {
    try {
        const updated_review = await Rate.updateOne(
            { author_id: author_id, review_id: review_id },
            { $set: { rate: new_rate } },
            { new: true }
        );
        //return updated_review;
    } catch (error) {
        //return null
    }
}

export async function POST(request: NextRequest) {
    try {
        // makes sure the user is logged
        const user_id = await validateJWT(request)
        const user = await User.findById(user_id)
        if (!user)
            throw new Error("User not logged")

        const req_data = await request.json()
        if (req_data.rate === null) {
            const rate = await Rate.findOneAndDelete({ author_id: req_data.author_id, review_id: req_data.review_id })
        } else {
            const rate = await Rate.find({ author_id: req_data.author_id, review_id: req_data.review_id })
            if (rate)
                await changeRate(req_data.author_id, req_data.review_id, req_data.rate)
            else {
                const new_rate = new Rate(req_data)
                console.log(new_rate)
                const x = await new_rate.save()
                console.log(x)
            }
        }

        return NextResponse.json({ message: "Rate created successfully" })
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message },
            { status: 400 }
        )
    }
}