"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import axios from 'axios'

export default function Home() {
    const [loading, setLoading] = useState(true)
    const [reviews, setReviews] = useState<any[]>([])

    useEffect(() => {
        if (loading) {
            axios.get("/api/review/getPerViews").then( res => {
                setReviews(res.data.results)
            })
            setLoading(false)
        }
    }, [])


    /* useEffect(() => {
     *     //esegue la funzione passatagli come parametro allo scadere del timeout, che in questo caso è di 2000 ms
     *     setTimeout(() => {
     *         setLoading(false)
     *     }, 1000)
     * }) */

    if (loading) {
        return (
            <main className="flex flex-col items-center p-8">
                <h1>RevHub</h1>
                <h2>LOADING...</h2>
            </main>
        )
    } else {
        console.log(typeof(reviews))
        console.log(reviews)
        return (
            <main className="flex flex-col p-8">
                <h1 className="text-[25px] font-bold">Recensioni più viste</h1>

            {reviews.map((rev, id) => (
                <Link key={id} href={`/review/${rev.id}`}>{rev.title}</Link>
            ))}

            </main>
        )
    }
}
