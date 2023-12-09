"use client"

import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import Searchbar from './searchbar'
import './style.css'
import { State_t, setUser } from '@/redux/store'
import { useDispatch, useSelector } from 'react-redux'

export default function Navbar() {
    const router = useRouter()
    const selectedUser = useSelector((state: State_t) => state.user)
    const reduxDispatcher = useDispatch();

    useEffect(() => {
        axios.get("/api/auth/current").then(res => {
            reduxDispatcher(setUser(res.data.data.id))
        }).catch(e => {
            reduxDispatcher(setUser(null))
        })
    }, [])

    return (
        <header className="header sticky">
            <h1 className="logo"><Link href="/">RevHub</Link></h1>
            <Searchbar />
            <ul className="main-nav">
                {selectedUser.id === null && <li><Link href="/hidden/createCredential">Create_Credential</Link></li>}
                {selectedUser.id !== null && <li><Link href="/profile">Profilo</Link></li>}
                {selectedUser.id !== null && <li><Link href="/review/create">Crea</Link></li>}
                {selectedUser.id !== null ?
                    <li><button onClick={() => {
                        router.prefetch("/")
                        axios.get("/api/auth/logout").then(res => {
                            //console.log(res.data)
                            reduxDispatcher(setUser(null))
                            router.push("/")
                        }).catch(e => {
                            console.log("error while logging out:", e)
                        })
                    }}>Logout</button></li>
                    :
                    <li><Link href="/auth/login">Login</Link></li>
                }
            </ul>
        </header>
    )
}
