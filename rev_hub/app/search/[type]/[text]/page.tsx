"use client"

import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import React from 'react';

function createList(tag: string, results: any[]) {
    if (tag === "review" || tag === "tag") {
        return (
            <div>
                {
                    results.map((title, id) => {
                        <Link key={id} href={`/review/${id}`}>{title}</Link>
                    })
                }
            </div>
        )
    } else if (tag === "user") {
        return (
            <div>
                {
                    results.map((id, username) => {
                        <Link key={id} href={`/profile/${id}`}>{username}</Link>
                    })
                }
            </div>
        )
    }
}

export default function SearchReview({ params }: { params: { type: string, text: string } }) {
    const [results, setResults] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    const txt = params.text.replaceAll('@', '').replaceAll('#', '').replaceAll("%20", " ").replaceAll("%22", '"')

    useEffect(() => {
        if (txt.length === 0) return

        console.log(`searching ${txt} using ${params.type}`)

        axios.get(`/api/search/${params.type}/${txt}`).then( res => {
            console.log(res.data)
            setResults(res.data)
            setLoading(false)
        }).catch(error => {
            alert("Error while searching: " + error.message)
            setLoading(false)
        })
    }, [])


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
                <h1 className="text-[25px] font-bold">Search Review for "{params.type}"</h1>
                <div className="flex space-x-2">
                    {/* {createList(tag, results)} */}
                </div>
            </main>
        )
}
