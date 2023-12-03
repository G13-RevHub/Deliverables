"use client"

import { useEffect, useState } from 'react'
import axios from 'axios'
import Head from 'next/head'

import './globals.css'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const [curr_user_id, setCurrUId] = useState(null)
    const [updateTriggerer, triggerUpdate] = useState(true)

    useEffect(() => {
        axios.get("/api/auth/current").then(res => {
            //console.log("current user:", res.data)
            setCurrUId(res.data.data.id)
        }).catch(e => {
            setCurrUId(null)
        })
    }, [updateTriggerer])

    return (
        <html lang="en">
            <Head>
                <title>RevHub</title>
                <meta name='description'>Applicazione sviluppata dal gruppo G13</meta>
            </Head>
            <body className="min-h-screen flex flex-col justify-between">
                <Navbar user_id={curr_user_id} triggerer={{ value: updateTriggerer, trigger: triggerUpdate }} />
                {children}
                <Footer />
            </body>
        </html>
    )
}
