"use client"
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function Page({ params }: { params: { id: number } }) {
    const [loading, setLoading] = useState(true)
    const [user_data, setUserData] = useState<any>()

    useEffect(() => {
        axios.post("/api/profile", { id: params.id }).then(res => {
            //console.log(res.data)
            setUserData({
                email: res.data.data.email,
                name: res.data.data.name,
                surname: res.data.data.surname,
                username: res.data.data.username
            })
            setLoading(false)
        }).catch(err => {
            console.log("error while obtaining profile data")
            setLoading(false)
        })
    }, [])

    return (
        <main>
            <h1>Dati utente: </h1>
            {loading ?
                <h3>Loading...</h3>
                :
                <div className="flex flex-col space-y-3">
                    <p>Username: {user_data.username}</p>
                    <p>Email: {user_data.email}</p>
                    <p>Name: {user_data.name}</p>
                    <p>Surname: {user_data.surname}</p>
                </div>
            }
        </main>
    )
}