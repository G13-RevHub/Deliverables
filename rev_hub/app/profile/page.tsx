"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

import { setUser } from "@/redux/store";
import { useDispatch } from "react-redux";


export default function Page() {
    const [loading, setLoading] = useState(true)
    const [user_data, setUserData] = useState<any>()
    const [user_reviews, setUserReviews] = useState<any[]>()
    const router = useRouter()
    const reduxDispatcher = useDispatch();

    useEffect(() => {
        axios.get("/api/user/get").then(res => {
            //console.log(res.data)
            setUserData({
                id: res.data.data.id,
                email: res.data.data.email,
                name: res.data.data.name,
                surname: res.data.data.surname,
                username: res.data.data.username
            })
            axios.get(`/api/user/getUserReviews/${res.data.data.id}`).then(res => {
                //console.log(res.data)
                setUserReviews(res.data.reviews)
                setLoading(false)
            }).catch(err => {
                console.log("error while obtaining user reviews")
                setLoading(false)
            })
        }).catch(err => {
            console.log("error while obtaining user data")
            //reduxDispatcher(setUser(null))
            //router.push("/auth/login")
            setLoading(false)
        })

    }, [])

    return (
        <main>
            <h1 className="mb-10">Il mio profilo</h1>

            <h2>Dati utente: </h2>
            {loading ?
                <h3>Loading...</h3>
                :
                <div className="flex flex-col space-y-3">
                    <p>Username: {user_data.username}</p>
                    <p>Email: {user_data.email}</p>
                    <p>Name: {user_data.name}</p>
                    <p>Surname: {user_data.surname}</p>
                    {
                        user_reviews?.length === 0 ?
                            <div className="flex flex-col space-y-3 mt-4">
                                <h2>L'utente non ha ancora scritto recensioni</h2>

                            </div>
                            :

                            <div className="flex flex-col space-y-3 mt-4">
                                <h2>Recensioni dell'utente:</h2>
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