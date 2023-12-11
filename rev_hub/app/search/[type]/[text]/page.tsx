"use client"

import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from 'next/navigation'
import React from 'react';
import Review from "@/models/reviewModel"
import { NextResponse } from "next/server"

function createList(tag: string, results: any[]) {
    return (
        <div></div>
    )
}

export default function SearchReview({ params }: { params: { type: string, text: string } }) {
    const [results, setResults] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    const pathname = usePathname()
    const pathWithoutSearch = pathname.replace("/search/", "");
    const segments = pathWithoutSearch.split("/");
    const tag = segments[0];
    const testo = segments[1];

    useEffect(() => {
        const txt = params.text.replaceAll('@', '').replaceAll('#', '').replaceAll("%20", " ").replaceAll("%22", '"')
        if (txt.length === 0) return

        console.log(`searching ${txt} using ${params.type}`)

        axios.get(`/api/search/${tag}/${txt}`).then(res => {
            console.log(res.data)
            setResults(res)
            setLoading(false)
        }).catch(error => {
            alert("Error while searching: ", error)
            setLoading(false)
        })
    }, [])

    console.log("results: ", results.data)

    if (loading)
        return (
            <main className="flex flex-col items-center p-8">
                <h1>RevHub</h1>
                <h2>LOADING...</h2>
            </main>
        )
    else
        return (
            <main className="flex flex-col p-8 w-full">
                <h1 className="text-[25px] font-bold">Search Review for "{testo}"</h1>
                <div className="flex space-x-2">
                    {/* {which_way(tag, testo)} */}
                    {createList(tag, results)}
                </div>
            </main>
        )
}
