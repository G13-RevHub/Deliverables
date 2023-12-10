import mongoose from "mongoose";

interface IComment {
    id: number,
    review_id: number,
    author_id: number,
    text: string,
    date: Date
}
export const Comment = new mongoose.Schema (
    {
        id: { type: Number, required: true },
        review_id: { type: Number, required: true },
        author_id: { type: Number, required: true },
        text: { type: String, required: true },
        date: { type: Date, required:true }
    }
)

// if the model is already defined, use that model else create a new one
export default mongoose.models.Comment<IComment> || mongoose.model<IComment>("Comment", Comment);