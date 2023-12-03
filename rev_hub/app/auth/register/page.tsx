"use client"

import axios from "axios"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export default function Register() {
    const [loading, setLoading] = useState(true)
    const [fetching, setFetching] = useState(false)
    const [usernames, setUsernames] = useState<string[]>([])
    const [errorMessage, setErrorMessage] = useState("")
    const [org, setOrg] = useState("")
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [username, setUsername] = useState("")
    const [returnedPassword, setRetPassw] = useState("")

    const router = useRouter()

    useEffect(() => {
        axios.get("/api/profile/getAllUsernames").then(res => {
            console.log(res.data)
            setLoading(false)
        }).catch(e => {
            console.log("something went wrong", e)
        })
    }, [])

    useEffect(() => {
        if (usernames.includes(username)) {
            setErrorMessage("Username già in uso")
        } else {
            setErrorMessage("")
        }
    }, [username])

    const handleSubmit = (event: any) => {
        event.preventDefault()
        if (org === "")
            return
        setFetching(true)

        const data = {
            organization: org,
            email: email,
            password: pass,
            username: username
        }

        console.log("sending:", data)
        axios.post("/api/auth/register", data).then(res => {
            console.log(res.data)
            setRetPassw(res.data.password)
            router.push("/auth/login")
            setFetching(false)
        }).catch(e => {
            console.log("errore: ", e)
            setFetching(false)
        })
    }

    if (loading)
        return (
            <main className="">
                <h2>Loading...</h2>
            </main>
        )
    else
        return (
            <main className="">
                <h2>Creazione di credenziali UniTn o Google per simulare l'uso di credenziali UniTn o Google per la creazione del profilo</h2>
                <div>
                    <p>new user password: {returnedPassword}</p>
                </div>
                <form className="w-3/4" onSubmit={handleSubmit}>
                    <label>
                        <span>Organizzazione:</span>
                        <select required name="organizzazione" onChange={event => setOrg(event.target.value)} defaultValue={"."} >
                            <option value="." disabled={true}>...</option>
                            <option value="UniTn">UniTn</option>
                            <option value="Google">Google</option>
                        </select>
                    </label>
                    <label>
                        <span>Email:</span>
                        <input required type="text" name="email" onChange={event => setEmail(event.target.value)} value={email} />
                    </label>
                    <label>
                        <span>Password:</span>
                        <input required type="text" name="password" onChange={event => setPass(event.target.value)} value={pass} />
                        {/*<input required type="password" name="password" onChange={event => setPass(event.target.value)} value={pass} />*/}
                    </label>
                    <label>
                        <span>Username:</span>
                        <input required type="text" name="username" onChange={event => setUsername(event.target.value)} value={username} />
                    </label>
                    <button disabled={errorMessage!=="" || fetching} type="submit" className="border-2 border-gray-600 p-2 mt-6">Invia</button>
                </form>
            </main>
        )
} 