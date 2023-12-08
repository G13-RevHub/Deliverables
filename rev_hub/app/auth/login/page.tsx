"use client"

import { setUser } from "@/redux/store"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useDispatch } from "react-redux"

export default function Login() {
    const [fetching, setFetching] = useState(false)
    const [pass, setPass] = useState("")
    const [username, setUsername] = useState("")
    const router = useRouter()
    const reduxDispatcher = useDispatch();

    const handleSubmit = (event: any) => {
        event.preventDefault()
        setFetching(true)

        const data = {
            password: pass,
            username: username
        }
        //console.log("sending:", data)
        router.prefetch("/")

        axios.post("/api/auth/login", data).then(res => {
            //console.log(res.data)
            reduxDispatcher(setUser(res.data.id))
            setFetching(false)
            router.push("/")
            router.refresh()
        }).catch(e => {
            alert("Login failed")
            console.log("errore: ", e)
            setFetching(false)
        })
    }

    if (fetching)
        return (
            <main className="">
                <h2>Loading...</h2>
            </main>
        )
    else
        return (
            <main className="">
                <h2>Login</h2>
                <div className="div_next">
                    <form className="w-3/4" onSubmit={handleSubmit}>
                        <label>
                            <span>Username:</span>
                            <input required type="text" name="username" onChange={event => setUsername(event.target.value)} value={username} />
                        </label>
                        <label>
                            <span>Password:</span>
                            <input required type="text" name="password" onChange={event => setPass(event.target.value)} value={pass} />
                            {/*<input required type="password" name="password" onChange={event => setPass(event.target.value)} value={pass} />*/}
                        </label>
                        <button disabled={fetching} type="submit" className="border-2 border-gray-600 p-2 mt-6">Login</button>
                    </form>
                    <Link className="link_next" href="/auth/register">Non hai un account ? Puoi registrati</Link>
                </div>
            </main>
        )
} 