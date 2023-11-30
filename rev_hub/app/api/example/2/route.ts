import { NextResponse } from "next/server";

export async function GET() {
    const response = NextResponse.json({
        easter_egg: [
            {
                message: "FusRoDah",
                example_value: 11
            },
            {
                message: "FeimZiiGron",
                example_value: 11
            },
            {
                message: "JoorZahFrul",
                example_value: 2011
            }
        ]
    });

    return response;
}