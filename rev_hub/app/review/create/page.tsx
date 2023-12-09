"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { State_t } from "@/redux/store";
import axios from "axios";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";


type ReviewData = {
    title: string,
    tags: string[],
    text: string
}
function isValidString(input: string): boolean { return input.length >= 3 && /^[a-zA-Z0-9_-]+$/.test(input) }

export default function CreateReview() {
    const selectedUser = useSelector((state: State_t) => state.user);
    const router = useRouter()
    const [fetching, setFetching] = useState(false)

    const [review_data, setReviewData] = useState<ReviewData>({ title: "", tags: [], text: "" })
    const [new_tag, setNewTag] = useState("")

    function userLogged(): boolean {
        if (selectedUser.id === null) {
            router.push("/")
            return false
        }
        return true
    }

    useEffect(() => {
        if (!userLogged())
            return
    }, [])

    const handleSubmit = (event: any) => {
        event.preventDefault()
        console.log(review_data)

        if (review_data.title.length < 4 || review_data.text.length < 20 || !userLogged()) {
            alert("Per creare una recensione va inserito un titolo di almeno 4 caratteri e un testo di almeno 20.")
            return
        }

        setFetching(true)

        const data = {
            id: selectedUser.id,
            ...review_data
        }
        console.log("sending:", data)
        setFetching(false)
        return
        router.prefetch("/")

        axios.post("/api/review/create", data).then(res => {
            //console.log(res.data)

            router.push("/")
            setFetching(false)
        }).catch(e => {
            alert("creazione della recensione fallita")
            console.log("errore: ", e)
            setFetching(false)
        })
    }

    const green_tag = {
        color: '#25c430',
    };

    if (fetching)
        return (
            <main className="">
                <h2>Loading...</h2>
            </main>
        )
    else
        return (
            <main className="">
                <h2>Puoi scrivere la tua recensione</h2>
                <form className="w-3/4 flex flex-col space-y-3" onSubmit={handleSubmit}>
                    <label>
                        <span>Titolo:</span>
                        <input required type="text" name="title" value={review_data.title} onChange={e => setReviewData({ ...review_data, title: e.target.value })} />
                    </label>
                    <label>
                        <span>Tags:</span>
                        {review_data.tags.map((tag, idx) => (
                            <div key={idx} className="flex flex-row w-full mx-5 border border-gray-600 px-2">
                                <p className="w-full" style={green_tag}># {tag}</p>
                                <button type="button" className="" onClick={() => {
                                    setReviewData({ ...review_data, tags: review_data.tags.filter(e => e !== tag) })
                                }}>
                                    <MinusIcon height={20} width={20} color={"red"}/>
                                </button>
                            </div>
                        ))}
                        <div className="flex flex-row items-center w-full mx-5 border border-gray-600 px-2">
                            <button type="button" className="" onClick={() => {
                                if (review_data.tags.includes(new_tag)) return
                                if (isValidString(new_tag)) {
                                    setReviewData({ ...review_data, tags: review_data.tags.concat(new_tag) })
                                    setNewTag("")
                                }
                                else
                                alert("i tag devono essere composti solo da numeri, lettere, o '-' o '_', ed essere lunghi almeno 3 caratteri")
                        }}>
                                <PlusIcon height={20} width={20} style={green_tag}/>
                            </button>
                            <p className="w-full"><input type="text" value={new_tag} onChange={e => setNewTag(e.target.value)} /></p>
                        </div>
                    </label>
                    <label>
                        <span>Testo:</span>
                        <textarea required name="body" value={review_data.text} onChange={e => setReviewData({ ...review_data, text: e.target.value })} />
                    </label>
                    <button disabled={fetching} type="submit" className="border-2 border-gray-600 p-2 mt-6">Crea</button>
                </form>
            </main>
        )
}
