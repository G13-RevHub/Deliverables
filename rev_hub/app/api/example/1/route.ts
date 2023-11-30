import { NextRequest, NextResponse } from "next/server";

export async function POST(params:NextRequest) {
    const data = await params.json()
    console.log(data)

    const respoonse = NextResponse.json({ message: "operation executed successfully" })

    return respoonse
}