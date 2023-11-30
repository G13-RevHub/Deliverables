import mongoose from "mongoose";

export const Comment = new mongoose.Schema (
    {
        author: { type: String, required: true },
        text: { type: String, required: true },
        date: { type: Date, required:true }
    }
)

// if the model is already defined, use that model else create a new one
export default mongoose.models["Comment"] || mongoose.model("comment", Comment);