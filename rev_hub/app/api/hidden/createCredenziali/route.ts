import { NextRequest, NextResponse } from "next/server";
import Credential from "@/models/credentialModel";
import { connectDB } from "@/configs/dbConfig";

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
    name: string,
    surname: string
 * }
 * @returns 
 */
export async function POST(request: NextRequest) {
    console.log("trying to create new autority credential")
    try {
        const req_data = await request.json()

        // check whether req_data has a valid Credential format
        if (!req_data.organization || (req_data.organization !== "UniTn" && req_data.organization !== "Google")
            || !req_data.password || req_data.password === "" || !req_data.name || req_data.name === "" || !req_data.surname || req_data.surname === ""
            || !req_data.email || !isValidEmail(req_data.email))
            return NextResponse.json(
                { message: "Wrong data format" },
                { status: 400 }
            )

        const credential = await Credential.findOne({ email: req_data.email })
        if (credential)
            throw new Error("Credentail already exists")

        const new_credential = new Credential(req_data)
        await new_credential.save()
        console.log("Credential successfully created")
        return NextResponse.json(
            { message: "Credential created successfully", data: new_credential },
            { status: 201 }
        )
    } catch (error: any) {
        console.log("an error occurred while creating new credentials: " + error.message, error)
        return NextResponse.json(
            { message: "an error occurred while creating new credentials", error_message: error.message, error: error },
            { status: 400 }
        )
    }
}