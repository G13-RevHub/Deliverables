import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { text: string } }) {
    console.log(params.text);
    //console.log(request.nextUrl.searchParams.get("foo"));
    return new Response("Hello from search user");
}