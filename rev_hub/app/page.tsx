"use client"

import axios from "axios"
import { useEffect, useState } from "react"

export default function Home() {
    const [numero, setNumero] = useState(0)
    const [numero1, setNumero1] = useState(0)
    const [numero12, setNumero12] = useState(false)

    const lista = [1,2,3,4,5]

    const data  = {
        stringa: "string"
    }
    useEffect(() => {
        if (!numero12) return
        console.log("sei bello")
        axios.post("api/review/create", data).then((res) => {
            console.log(res.data)
        })
        lista.forEach((v) => {
            console.log(v)
        })
    }, [numero])

    return (
        <main className="flex flex-col items-center p-8">
            <h1>RevHub</h1>
            <p>ciao</p>
            <p>numero = {numero}</p>
            <button className="border-2 border-gray-600 p-2" onClick={() => {
                setNumero(numero + 1)
                console.log(numero + 1)
            }}>+</button>
            
            <button className="border-2 border-gray-600 p-2" onClick={() => {
                setNumero1(numero1 + 1)
                console.log(numero1 + 1)
            }}>+1</button>
            <p>prova_1_0</p>

            <br></br>

            {lista.map((value, id) => {
                return (
                    <p key={id}>value = {value}</p>
                )
            })}
        </main>
    )
}
