"use client"

import Link from 'next/link'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'

import './style.css'
import { State_t } from '@/redux/store'


let loaded_once = false
export default function Page({ params }: { params: { id: number } }) {
    const selectedUser = useSelector((state: State_t) => state.user);
    const [loading, setLoading] = useState(true)
    const [review, setReview] = useState<any>()
    const [review_auth_usr, setReviewAuthUsr] = useState("")
    const [rates, setRates] = useState<any[]>([])
    const [user_rate, setUserRate] = useState<boolean | null>(null)
    const [comments, setComments] = useState<any[]>([])
    const router = useRouter()

    useEffect(() => {
        if (Number.isNaN(params.id))
            router.push("/")

        if (!loaded_once) {
            loaded_once = true
            axios.get(`/api/review/get/${params.id}`).then(res => {
                console.log(res.data)
                setReview(res.data.review)
                setReviewAuthUsr(res.data.auth_usr)
                setRates(res.data.rates)
                setComments(res.data.comments)
                setUserRate(res.data.rates.find((rate: { author_id: { id: number | null } }) => rate.author_id === selectedUser))
                setLoading(false)
            }).catch(err => {
                console.log("error while obtaining the review", err)
                router.push("/")
            })
        }
    }, [])

    const handleCommentSubmit = (event: any) => {
        event.preventDefault()


    }

    if (loading)
        return (
            <main className="">
                <h2>Loading...</h2>
            </main>
        )
    else
        return (
            <main className="min-h-screen">
                <div className="flex flex-col p-8 space-y-5">
                    <h2 className="title">{review.title}</h2>
                    <p><Link href={`/profile/${review.author_id}`} className="author">{review_auth_usr}</Link> - {review.date}</p>
                    <p>Visualizzazioni: {review.views}</p>
                    <div className="">
                        <h2>Tags:</h2>
                        <div className="flex space-x-2">
                            {review.tags.map((tag: string, key: number) => (
                                <p key={key} className="tag"># {tag}</p>
                            ))}
                        </div>
                    </div>
                    <p className="body">{review.text}</p>

                    <div className="flex flex-row space-x-4 justify-center">
                        <button type="button" className={"like_btn ".concat(user_rate !== null && user_rate === true ? "like_btn_selected" : "")} onClick={async () => {
                            if (user_rate === null) {
                                setUserRate(true)
                                await axios.post("/api/review/rate", { author_id: selectedUser.id, review_id: review.id, rate: true })
                            } else if (user_rate === true) {
                                setUserRate(null)
                                await axios.post("/api/review/rate", { author_id: selectedUser.id, review_id: review.id, rate: null })
                            } else {
                                setUserRate(true)
                                await axios.post("/api/review/rate", { author_id: selectedUser.id, review_id: review.id, rate: true })
                            }
                        }}>
                            <span id="count">{rates.filter(rate => rate.rate).length}</span> Like
                        </button>
                        <button type="button" className={"like_btn".concat(user_rate !== null && user_rate === false ? "like_btn_selected" : "")} onClick={async () => {
                            if (user_rate === null) {
                                setUserRate(false)
                                await axios.post("/api/review/rate", { author_id: selectedUser.id, review_id: review.id, rate: false })
                            } else if (user_rate === true) {
                                setUserRate(false)
                                await axios.post("/api/review/rate", { author_id: selectedUser.id, review_id: review.id, rate: false })
                            } else {
                                setUserRate(null)
                                await axios.post("/api/review/rate", { author_id: selectedUser.id, review_id: review.id, rate: null })
                            }
                        }}>
                            <span id="count">{rates.filter(rate => !rate.rate).length}</span> Dislike
                        </button>
                    </div>

                    <div className='commenti-div mt-5'>
                        <h2 className="title">Commenti</h2>
                        <div id="app">
                            <form className="container" onSubmit={handleCommentSubmit}>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="comment">
                                            <p v-for="items in item" v-text="items"></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <textarea className="input" placeholder="Scrivi un commento" v-model="newItem" />
                                        <button className='primaryContained float-right' type="submit">Invia</button>
                                    </div>
                                </div>
                            </form>

                        </div>
                        {comments?.map((comment: { auth_usr: string, text: string }, key: number) => (
                            <div key={key}>
                                <h3>{comment.auth_usr}</h3>
                                <p className="comment">{comment.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        )
}