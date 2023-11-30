"use client"

import axios from "axios"
import { useEffect, useState } from "react"

export default function Home() {
    const [numero, setNumero] = useState(0)
    const [numero1, setNumero1] = useState(0)
    const [loading, setLoading] = useState(true)

    const lista = [1, 2, 3, 4, 5]

    const data = {
        stringa: "string"
    }
    useEffect(() => {
        if (loading) return

        console.log("sei bello")
        axios.post("api/example/1", data).then((res) => {
            console.log(res.data)
        }).catch((error) => {
            console.log("si è verificato un errore")
            console.log("l'errore è il seguente:", error)
        })
        lista.forEach((v) => {
            console.log(v)
        })
    }, [numero])

    useEffect(() => {
        //esegue la funzione passatagli come parametro allo scadere del timeout, che in questo caso è di 2000 ms
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    })

    if (loading)
        return (
            <main className="flex flex-col items-center p-8">
                <h1>RevHub</h1>
                <h2>LOADING...</h2>
            </main>
        )
    else
        return (
            <main className="flex flex-col items-center p-8">
                <h1 className="text-[50px] font-bold">RevHub</h1>
                <p>ciao</p>
                <p>numero = {numero}</p>
                <button className="border-2 border-gray-600 p-2 my-2" onClick={() => {
                    setNumero(numero + 1)
                    console.log(numero + 1)
                }}>+</button>

                <button className="border-2 border-gray-600 p-2 my-2" onClick={() => {
                    setNumero1(numero1 + 1)
                    console.log(numero1 + 1)
                }}>+1</button>
                <p>prova_1_0</p>

                <br />

                {lista.map((value, id) => {
                    return (
                        <p key={id}>value = {value}</p>
                    )
                })}

                <button className="border-2 border-gray-600 p-2 mt-6" onClick={() => {
                    axios.get("api/example/2").then((res) => {
                        console.log(res.data)
                    }).catch((error) => {
                        console.log("si è verificato un errore")
                        console.log("l'errore è il seguente:", error)
                    })
                }}>bottone del divertimento</button>
            </main>
        )
}
