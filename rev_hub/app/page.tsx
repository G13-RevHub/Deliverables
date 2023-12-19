"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export default function Home() {
    const [loading, setLoading] = useState(true)

    const lista = [1, 2, 3, 4, 5]

    useEffect(() => {
        if (loading) return

        // qui deve ottenere la lista di recensioni
        setTimeout(() => {
            setLoading(false)
        }, 500)
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
            <main className="flex flex-col p-8">
                <h1 className="text-[25px] font-bold">Recensioni più viste</h1>
                {lista.map((value, id) => (
                    <Link key={id} href={`/review/${value}`}>recensione {value}</Link>
                ))}
            </main>
        )
}
