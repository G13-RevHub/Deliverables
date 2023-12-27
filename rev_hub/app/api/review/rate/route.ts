import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import Rate from "@/models/rateModel";

import { validateJWT } from "@/helpers/validateJWT";
import { connectDB } from "@/configs/dbConfig";

connectDB();

export async function PUT(request: NextRequest) {
    try {
        // makes sure the user is logged
        const user_id = await validateJWT(request)
        const user = await User.findById(user_id)
        if (!user)
            return NextResponse.json(
                { message: "User not logged" },
                { status: 400 }
            )

        const req_data = await request.json()
        const existingRate = await Rate.findOne({ author_id: req_data.author_id, review_id: req_data.review_id });
        if (req_data.rate === null) {
            if (existingRate) {
                await Rate.deleteOne({ author_id: req_data.author_id, review_id: req_data.review_id });
            }
        } else {
            if (existingRate){
                if (req_data.rate === existingRate.rate) {
                    await Rate.deleteOne({ author_id: req_data.author_id, review_id: req_data.review_id });
                } else{
                    existingRate.rate = req_data.rate;
                    await existingRate.save();
                }
            } else {
                const new_rate = new Rate(req_data)
                const x = await new_rate.save()
            }
        }

        const rates = await Rate.find({ review_id: req_data.review_id })

        return NextResponse.json({ message: "Rate created successfully", rates: rates })
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message },
            { status: 400 }
        )
    }
}