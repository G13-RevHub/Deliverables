"use client"

import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from 'next/navigation'
import React from 'react';
import Review from "@/models/reviewModel"
import { NextResponse } from "next/server"

async function which_way(tag: string, testo: string): Promise<any>{
//const which_way = async (tag: string, testo: string) => {
    try {
        if(tag==='tag'){
            //ricerca di rec per tag
            axios.post("/api/search/tag", testo).then(res => {
                console.log(res.data)
            }).catch(e => {
                alert("Search failed")
                console.log("errore: ", e)
            })
  //          const result = await Review.find({ title: testo })
//            return NextResponse.json({ results: result })
            /*return <div>
                        <ul>
                        {
                            review.tags.map((id: number, key: number) => (
                                <li><Link href={`/review/${id}`} key={key} className="tag">{}</Link></li>
                            ))
                        }
                        </ul>
                   </div>*/
        }
        else if(tag==='user'){
            //ricerca x user
            axios.post("/api/search/user", testo).then(res => {
                console.log(res.data)
            }).catch(e => {
                console.log("errore: ", e)
            })
            /*return <div>
                        <ul>
                        {
                            review.tags.map((id: number, key: number) => (
                                <li><Link href={`/profile/${id}`} key={key} className="tag">{}</Link></li>
                            ))
                        }
                        </ul>
                   </div>*/
        }
        else{
            //ricerca x testo
            axios.post("/api/search/user", testo).then(res => {
                console.log(res.data)
            }).catch(e => {
                alert("Search failed")
                console.log("errore: ", e)
            })
            /*return <div>
                        <ul>
                        {
                            review.tags.map((id: number, key: number) => (
                                <li><Link href={`/review/${id}`} key={key} className="tag">{}</Link></li>
                            ))
                        }
                        </ul>
                   </div>*/
        }  
    } catch (error) {
        console.error('Errore nella query:', error);
        throw error;
    }
}

export default function SearchReview({ params }: { params: { type: string, text: string } }) {
    const [results, setResults] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    
    const pathname = usePathname()
    const pathWithoutSearch = pathname.replace("/search/", "");
    const segments = pathWithoutSearch.split("/");
    const tag = segments[0];
    const testo = segments[1];

    useEffect(() => {
        const txt = params.text.replaceAll('@', '').replaceAll('#', '').replaceAll("%20", " ").replaceAll("%22", '"')
        if (txt.length === 0) return

        console.log(`searching ${txt} using ${params.type}`)

        axios.get(`/api/search/review/${txt}`).then(res => {
            console.log(res.data)
            setLoading(false)
        }).catch(error => {
            console.error("error while searching:", error)
            setLoading(false)
        })
    }, [])


    if (loading)
        return (
            <main className="flex flex-col items-center p-8">
                <h1>RevHub</h1>
                <h2>LOADING...</h2>
            </main>
        )
    else
        return (
            <main className="flex flex-col p-8 w-full">
                <h1 className="text-[25px] font-bold">Search Review for "{testo}"</h1>
                <div className="flex space-x-2">
                    {which_way(tag, testo)}
                </div>
            </main>
        )
}
