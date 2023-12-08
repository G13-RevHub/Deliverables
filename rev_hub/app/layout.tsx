"use client"

import { useEffect, useState } from 'react'
import axios from 'axios'
import Head from 'next/head'

import './globals.css'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { Providers } from "@/redux/provider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <Head>
                <title>RevHub</title>
                <meta name='description'>Applicazione sviluppata dal gruppo G13</meta>
            </Head>
            <body className="min-h-screen flex flex-col justify-between">
                <Providers>
                    <Navbar />
                    <div className="grow">
                        {children}
                    </div>
                    <Footer />
                </Providers>
            </body>
        </html>
    )
}
