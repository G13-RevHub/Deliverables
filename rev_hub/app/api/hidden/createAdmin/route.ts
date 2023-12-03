import { connectDB } from "@/configs/dbConfig";
import User from "@/models/userModel";
import Credential from "@/models/credentialModel";
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcrypt";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const req_data = await request.json()
        //check if the user already exists
        const userExists = await User.findOne({ email: req_data.email })
        if (userExists) { throw new Error("User already exists"); }

        // simulate the login using unitn/google credential. orgranization = "Google" or "UniTn"
        const isEmailValid = await Credential.findOne({ email: req_data.email, organization: req_data.organization })
        if (!isEmailValid) { throw new Error("Credential not valid"); }

        // create new user
        // random string
        const salt = await bcrypt.genSalt(10);
        // hashing the pwd
        const hashedPassword = await bcrypt.hash(req_data.password, salt);
        // new user data
        var id = 1
        const users = await User.find({})
        users.forEach(user => {
            if (user.id > id) id = user.id + 1
        })
        const new_user_data = {
            id: id,
            name: req_data.name,
            surname: req_data.surname,
            username: req_data.username,
            email: req_data.email,
            password: hashedPassword,
            isAdmin: true
        }

        const newUser = new User(new_user_data)
        await newUser.save()
        return NextResponse.json({ message: "User created successfully", data: newUser })
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message },
            { status: 400 }
        )
    }
}