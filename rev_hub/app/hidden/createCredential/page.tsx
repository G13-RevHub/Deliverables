"use client"

import axios from "axios"
import { errorToJSON } from "next/dist/server/render"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function CreateCredenziali() {
    const [org, setOrg] = useState("")
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const router = useRouter()

    const handleSubmit = (event: any) => {
        event.preventDefault()

        const data = {
            organization: org,
            email: email,
            password: pass,
            name: name,
            surname: surname
        }

        console.log("sending:", data)
        axios.post("/api/hidden/createCredenziali", data).then(res => {
            if (res.status === 401) {
                alert("credential already exists")
                return
            }

            console.log("created credential:", res.data)
            router.push("/auth/register")
        }).catch(e => {
            console.log("errore: ", e)
        })
    }

    return (
        <main className="">
            <h2>Creazione di credenziali UniTn o Google per simulare l'uso di credenziali UniTn o Google per la creazione del profilo</h2>
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
                    <span>Name:</span>
                    <input required type="text" name="name" onChange={event => setName(event.target.value)} value={name} />
                </label>
                <label>
                    <span>Surname:</span>
                    <input required type="text" name="surname" onChange={event => setSurname(event.target.value)} value={surname} />
                </label>
                <label>
                    <span>Email:</span>
                    <input required type="email" name="email" onChange={event => setEmail(event.target.value)} value={email} />
                </label>
                <label>
                    <span>Password:</span>
                    <input required type="text" name="password" onChange={event => setPass(event.target.value)} value={pass} />
                    {/*<input required type="password" name="password" onChange={event => setPass(event.target.value)} value={pass} />*/}
                </label>
                <button type="submit" className="border-2 border-gray-600 p-2 mt-6">Invia</button>
            </form>
        </main>
    )
} 