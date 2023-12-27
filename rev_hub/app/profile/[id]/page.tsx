"use client"

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function Page({ params }: { params: { id: number } }) {
    const [loading, setLoading] = useState([true, true])
    const [user_data, setUserData] = useState<any>()
    const [user_reviews, setUserReviews] = useState<any[]>([])
    const [error, setError] = useState(false)

    useEffect(() => {
        axios.get(`/api/user/get/${params.id}`).then(res => {
            setUserData({
                email: res.data.data.email,
                name: res.data.data.name,
                surname: res.data.data.surname,
                username: res.data.data.username
            })
            setLoading(loading => [loading[0], false])
        }).catch(err => {
            console.log("error while obtaining user data")
            setError(true)
            setLoading(loading => [loading[0], false])
            setUserData(null)
        })

        axios.get(`/api/user/getUserReviews/${params.id}`).then(res => {
            setUserReviews(res.data.reviews)
            setLoading(loading => [false, loading[1]])
        }).catch(err => {
            console.log("error while obtaining user reviews")
            setError(true)
            setLoading(loading => [false, loading[1]])
            setUserReviews([])
        })
    }, [])

    if (error)
        return (
            <main>
                <h1>L&apos;utente non esiste </h1>
            </main>
        )
    else
        return (
            <main>
                <h1>Dati utente: </h1>
                {loading[0] || loading[1] ?
                    <h3>Caricamento...</h3>
                    :
                    <div className="flex flex-col space-y-3">
                        <p>Username: {user_data.username}</p>
                        <p>Email: {user_data.email}</p>
                        <p>Name: {user_data.name}</p>
                        <p>Surname: {user_data.surname}</p>
                        {
                            user_reviews?.length === 0 ?
                                <div className="flex flex-col space-y-3 mt-4">
                                    <h2>L&apos;utente non ha ancora scritto recensioni</h2>

                                </div>
                                :
                                <div className="flex flex-col space-y-3 mt-4">
                                    <h2>Recensioni dell&apos;utente:</h2>
                                    <ul>
                                        {user_reviews?.map((rev, idk) => (
                                            <li key={idk}><Link href={`/review/${rev.id}`}>{rev.title}</Link></li>
                                        ))}
                                    </ul>
                                </div>
                        }
                    </div>
                }
            </main>
        )
}