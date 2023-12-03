import mongoose from "mongoose";

interface IUser extends Document {
    id: number,
    name: string,
    surname: string,
    username: string,
    email: string,
    password: string,
    followers?: number[],
    isAdmin?: boolean
}
export const User = new mongoose.Schema(
    {
        id: { type: Number, required: true, unique: true },
        name: { type: String, required: true },
        surname: { type: String, required: true },
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        followers: { type: [Number], default: [], required: false },
        isAdmin: { type: Boolean, default: false, required: false, }
    }
)

// if the model is already defined, use that model else create a new one
export default mongoose.models.User || mongoose.model<IUser>("User", User);