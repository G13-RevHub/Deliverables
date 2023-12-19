"use client"

import Link from 'next/link'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { format } from 'date-fns';

import './style.css'
import { State_t } from '@/redux/store'

let loaded_once = false
export default function Page({ params }: { params: { id: number } }) {
    const selectedUser = useSelector((state: State_t) => state.user);
    const [loading, setLoading] = useState([true, true])
    const [review, setReview] = useState<any>()
    const [review_auth_usr, setReviewAuthUsr] = useState("")
    const [rates, setRates] = useState<any[]>([])
    const [user_rate, setUserRate] = useState<boolean | null>(null)
    const [rating, setRating] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if (Number.isNaN(params.id))
            router.push("/")

        if (!loaded_once) {
            loaded_once = true
            axios.get(`/api/review/get/${params.id}`).then(res => {
                //console.log("data: ", res.data)
                setReview(res.data.review)
                setReviewAuthUsr(res.data.auth_usr)
                setRates(res.data.rates || []);
                setLoading(old => [false, old[1]])
            }).catch(err => {
                console.log("error while obtaining the review", err)
                router.push("/")
            })
        }
    }, [])

    useEffect(() => {
        if (selectedUser.id !== null && rates.length > 0) {
            const usr_rate = rates.find((rate: any) => rate.author_id === selectedUser.id)
            if (usr_rate.rate === undefined)
                setUserRate(null)
            else
                setUserRate(usr_rate.rate)
        }
        setLoading(old => [old[0], false])
    }, [rates])

    const handleRate = (newRate: boolean | null) => {
        if (!review) {
            console.error("Review not initialized");
            return;
        }
        setRating(true)
        const new_rate = {
            author_id: selectedUser.id,
            review_id: review.id,
            rate: newRate,
        }
        axios.post("/api/review/rate", new_rate).then(res => {
            //console.log("Server response:", res.data);
            setUserRate(newRate);
            setRates(res.data.rates)
            setRating(false)
        }).catch(error => {
            console.error("Error while updating rate:", error);
            setRating(false)
        })
    };

    if (loading[0] || loading[1])
        return (
            <main className="flex flex-col items-center p-8">
                <h2>Caricamento...</h2>
            </main>
        )
    else
        return (
            <main className="min-h-screen">
                <div className="flex flex-col p-8 space-y-5">
                    <h2 className="title">{review.title}</h2>
                    <p><Link href={`/profile/${review.author_id}`} className="author">{review_auth_usr}</Link> - {format(new Date(review.date), 'dd/MM/yyyy - HH:mm')}</p>
                    <p>Visualizzazioni: {review.views}</p>
                    <div className="">
                        <h2>Tags:</h2>
                        <div className="flex space-x-2">
                            {review.tags.map((tag: string, key: number) => (
                                <Link href={`/search/tag/${tag}`} key={key} className="tag">#{tag}</Link>
                            ))}
                        </div>
                    </div>
                    <p className="body line-feed-enabled">{review.text}</p>

                    <div className="flex flex-row space-x-4 justify-center">
                        <button type="button" disabled={rating}
                            className={"like_btn ".concat(user_rate !== null && user_rate === true ? "like_btn_selected" : "")}
                            onClick={() => {
                                handleRate(user_rate === true ? null : true)
                            }}
                        >
                            <span>{rates && rates.filter((rate) => rate.rate).length}</span> Like
                        </button>
                        <button type="button" disabled={rating}
                            className={"like_btn ".concat(user_rate !== null && user_rate === false ? "like_btn_selected" : "")}
                            onClick={() => {
                                handleRate(user_rate === false ? null : false)
                            }}
                        >
                            <span>{rates && rates.filter((rate) => !rate.rate).length}</span> Dislike
                        </button>
                    </div>
                </div>
            </main>
        )
}
