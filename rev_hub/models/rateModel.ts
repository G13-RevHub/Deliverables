import mongoose from "mongoose";

interface IRate extends Document {
    author_id: number,
    review_id: number,
    rate: boolean
}
export const Rate = new mongoose.Schema (
    {
        author_id: { type: Number, required: true },
        review_id: { type: Number, required: true },
        rate: { type: Boolean, required: true }
    }
)

// if the model is already defined, use that model else create a new one
export default mongoose.models.Rate || mongoose.model<IRate>("Rate", Rate);
