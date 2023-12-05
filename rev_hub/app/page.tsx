"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export default function Home() {
    const [loading, setLoading] = useState(true)

    const lista = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]

    useEffect(() => {
        if (loading) return


    }, [])

    useEffect(() => {
        //esegue la funzione passatagli come parametro allo scadere del timeout, che in questo caso è di 2000 ms
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    })

    const handleSearchSubmit = (event: any) => {
        event.preventDefault()

    }

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
                    <Link key={id} href={`/review/${value}`}> value = {value}</Link>
                ))}
            </main >
        )
}
