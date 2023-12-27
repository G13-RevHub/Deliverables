import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/configs/dbConfig";
import Review from "@/models/reviewModel";
import Rate from "@/models/rateModel";
import Comment from "@/models/commentModel";
import Users from "@/models/userModel";


connectDB();

// visualizzazioni + 1
async function updateViews(id: number, new_views: number): Promise<void> {
    try {
        const updated_review = await Review.updateOne(
            { id: id },
            { $set: { views: new_views } },
            { new: true }
        );
    } catch (error) {
    }
}

export async function GET(request: NextRequest, { params }: { params: { id: number } }) {
    if (Number.isNaN(params.id) || params.id < 1)
        return NextResponse.json({ message: "Argument not valid" }, { status: 400 })

    // parallelizzazione delle promesse (in questo caso delle query)
    const [review, rates, comments, users] = await Promise.all([
        Review.findOne({ id: params.id }),
        Rate.find({ review_id: params.id }),
        Comment.find({ review_id: params.id }),
        Users.find({})
    ])
    if (review === null || rates === null || comments === null || users === null)
        return NextResponse.json({ message: "Failed to retive the review" }, { status: 400 })

    await updateViews(params.id, review.views + 1)
    comments.forEach(comment => {
        comment = {
            ...comment,
            auth_usr: users.find(user => { if (user.id === comment.author_id) return user.username })
        }
    })

    if (review)
        return NextResponse.json({ review: review, auth_usr: users.find(user => user.id === review.author_id).username, rates: rates, comments: comments })
    else
        return NextResponse.json({ message: "Failed to retive the review" }, { status: 400 })
}