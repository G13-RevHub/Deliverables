import mongoose from "mongoose";

interface ICredental {
    organization: string,
    email: string,
    password: string,
    name: string,
    surname: string
}
export const Credental = new mongoose.Schema(
    {
        organization: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        name: { type: String, required: true },
        surname: { type: String, required: true }
    }
)

// if the model is already defined, use that model else create a new one
export default mongoose.models.Credental<ICredental> || mongoose.model<ICredental>("Credental", Credental);