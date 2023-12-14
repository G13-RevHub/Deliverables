"use client"

import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import React from 'react';

function createList(tag: string, results: any[]) {
    console.log("Results_2: ", results)
    if (!results || results.length === 0) {
        return <div>Undefined.</div>;
    }
    if (tag === "review" || tag === "tag") {
        return (
            <div>
                <p>pin</p>
                {
                    //non so perché ci vadano le () al posto di {} dopo =>
                    results.map((title, id) => (
                        <Link key={id} href={`/review/${id}`}>{title}</Link>
                    ))
                }
            </div>
        )
    } else if (tag === "user") {
        return (
            <div>
                <ul>
                {
                    results.map((id, username) => (
                        <li><Link key={id} href={`/profile/${id}`}>{username}</Link></li>
                    ))
                }
                </ul>
            </div>
        )
    }
    return <div>Nessun risultato disponibile.</div>;
}

export default function SearchReview({ params }: { params: { type: string, text: string } }) {
    const [results, setResults] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    const txt = params.text.replaceAll('@', '').replaceAll('#', '').replaceAll("%20", " ").replaceAll("%22", '"')

    useEffect(() => {
        console.log("Results: ", results)
        if (txt.length === 0) return

        console.log(`searching ${txt} using ${params.type}`)

        axios.get(`/api/search/${params.type}/${txt}`).then( res => {
            console.log("res.data: " + res.data)
            console.log("res.data.items: " + res.data.items)
            setResults(res.data.items)//forse qui va .items perché se no dà errore con results.map
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
                <h2>Caricamento...</h2>
                <h4>In caso di lentezza, la preghiamo di ricaricare</h4>
            </main>
        )
    else
        return (
            <main className="flex flex-col p-8 w-full">
                <h1 className="text-[25px] font-bold">Search Review for "{params.text}"</h1>
                <div className="flex space-x-2">
                    {
                        createList(params.type, results) 
                    }
                </div>
            </main>
        )
}
