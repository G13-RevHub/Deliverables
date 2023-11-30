import mongoose from "mongoose";

export const User = new mongoose.Schema (
    {
        name: { type: String, required: true, },
        surname: { type: String, required: true, },
        username: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true }
    }
)

// if the model is already defined, use that model else create a new one
export default mongoose.models["Users"] || mongoose.model("users", User);