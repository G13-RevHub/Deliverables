import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation'

import './style.css'

export default function Navbar(params: { user_id: number | null, triggerer: { value: boolean, trigger: Function } }) {
    const router = useRouter()

    return (
        <header className="header">
            <h1 className="logo"><Link href="/">RevHub</Link></h1>
            <ul className="main-nav">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/hidden/createCredential">Create_Credential</Link></li>
                {params !== undefined && params.user_id !== null && <li><Link href={`/profile`}>Profilo</Link></li>}
                {params !== undefined && params.user_id !== null && <li><Link href="/review">Recensioni</Link></li>}
                {params !== undefined && params.user_id !== null && <li><Link href="/review/create">Crea</Link></li>}
                {params !== undefined && params.user_id !== null ?
                    <li><button onClick={() => {
                        router.prefetch("/")
                        axios.get("/api/auth/logout").then(res => {
                            //console.log(res.data)
                            params.triggerer.trigger(!params.triggerer.value)
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
