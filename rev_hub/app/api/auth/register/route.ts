import { connectDB } from "@/configs/dbConfig";
import User from "@/models/userModel";
import Credential from "@/models/credentialModel";
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcrypt";

connectDB();

// test whether the string has a valid email format
function isValidEmail(email: string): boolean {
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

/**
 * la request deve contenere i seguenti parametri, tutti non vuoti e con valori validi
 * @param request: {
    organization: string, -> con valore "UniTn" oppure "Google"
    email: string, -> con un formato valido per una mail
    password: string,
    username: string,
 * }
 * @returns 
 */
export async function POST(request: NextRequest) {
    try {
        const req_data = await request.json()

        // check whether req_data has a valid User format
        if (!req_data.organization || (req_data.organization !== "UniTn" && req_data.organization !== "Google") || !req_data.username || req_data.username === ""
            || !req_data.password || req_data.password === "" || !req_data.email || !isValidEmail(req_data.email))
            return NextResponse.json(
                { message: "Wrong data format" },
                { status: 400 }
            )

        //check if the user already exists
        const userEmailExists = await User.findOne({ email: req_data.email })
        const userUsernameExists = await User.findOne({ username: req_data.username })
        if (userEmailExists || userUsernameExists) { throw new Error("User already exists") }

        // simulate the login using unitn/google credential. orgranization = "Google" or "UniTn"
        const credential = await Credential.findOne({ email: req_data.email, organization: req_data.organization })
        if (!credential) { throw new Error("Credential unexisting") }

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
            name: credential.name,
            surname: credential.surname,
            username: req_data.username,
            email: req_data.email,
            password: hashedPassword,
            followers: [],
            isAdmin: false
        }

        const newUser = new User(new_user_data)
        //console.log(newUser)
        const x = await newUser.save()
        console.log(x)
        return NextResponse.json({ message: "User created successfully" })
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message },
            { status: 400 }
        )
    }
}