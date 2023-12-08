import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { connectDB } from "@/configs/dbConfig";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const req_data = await request.json()

        const user = await User.findOne({ username: req_data.username })
        if (!user) {
            console.log("User does not exist")
            throw new Error("User does not exist")
        }

        // password match
        const passwordMatch = await bcrypt.compare(req_data.password, user.password)
        if (!passwordMatch) {
            console.log("Invalid credentials")
            throw new Error("Invalid credentials")
        }

        // create token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: "1d" })
        const response = NextResponse.json({ id: user.id })
        response.cookies.set("token", token, { httpOnly: true, path: "/" })

        return response
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message },
            { status: 400 }
        )
    }
}