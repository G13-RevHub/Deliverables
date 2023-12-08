"use client"

import Link from 'next/link'
import './style.css'

function getReviews(id: number) {
    const review = {
        title: `Review ${id}`,
        author: "auth 1",
        author_id: 1,
        date: new Date("12-01-2023"),
        tags: [
            "#tag1",
            "#tag2",
            "#tag3"
        ],
        text: `text of rev ${id}`,
        /*comments: [
            "comment 1",
            "comment 2",
            "comment 3",
            "comment 4",
            "comment 5"
        ]*/
    }
    return review
}

export default function Page({ params }: { params: { id: number } }) {
    const reviews = getReviews(params.id)

    return (
        <main className="flex flex-col min-h-screen items-center p-8">
            <div>
                <h2 className="title">{reviews.title}</h2>
                <p><Link href={`/profile/${reviews.author_id}`} className="author">{reviews.author}</Link> - {reviews.date.toDateString()}</p>
                <div>
                    <h3>Tags:</h3>
                    <div className="flex space-x-2">
                        {reviews?.tags.map((tag, key) => (
                            <p key={key} className="tag">{tag}</p>
                        ))}
                    </div>
                </div>
                <p className="body">{reviews.text}</p>

                <button className="like_btn">
                    <span id="icon"><i className="far fa-thumbs-up" /></span>
                    <span id="count">0</span> Like
                </button>

                <div className='commenti-div'>
                    <h2 className="title">Commenti</h2>
                    <div id="app">
                        <div className="container">
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
                        </div>

                    </div>
                    {/*{reviews?.comments.map((comment, key) => (
                        <p key={key} className="comment">{comment}</p>
                    ))}*/}
                </div>
            </div>
        </main>
    )
}