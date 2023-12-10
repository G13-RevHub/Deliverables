import mongoose from "mongoose";

interface IReview {
    id: number,
    title: string,
    author_id: number,
    date: Date,
    tags?: string[],
    text: string,
    views?: number
}
export const Review = new mongoose.Schema(
    {
        id: { type: Number, required: true, unique: true },
        title: { type: String, required: true },
        author_id: { type: Number, required: true },
        date: { type: Date, default: Date.now, required: true, },
        tags: { type: [String], default: [], required: false },
        text: { type: String, required: true },
        views: { type: Number, default: 0, required: false }
    }
)

// if the model is already defined, use that model else create a new one
export default mongoose.models.Review<IReview> || mongoose.model<IReview>("Review", Review);
