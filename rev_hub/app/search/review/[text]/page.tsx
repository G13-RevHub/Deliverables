"use client"

import axios from "axios"
import { useEffect, useState } from "react"

export default function SearchReview({ params }: { params: { text: string } }) {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const txt = params.text.replaceAll('@', '').replaceAll('#', '').replaceAll("%20", " ")
        if (txt.length === 0) return

        console.log(txt)

        axios.get(`/api/search/review/${txt}`).then(res => {
            console.log(res.data)
            setLoading(false)
        }).catch(error => {
            console.error("error while searching:", error)
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
                <h1 className="text-[25px] font-bold">Search</h1>
            </main>
        )
}
