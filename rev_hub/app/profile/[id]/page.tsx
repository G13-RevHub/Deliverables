import Link from "next/link";


export default async function Page({ params }: { params: { id: number } }) {

    return (
        <main>
            <h1>Username: Bonifacio</h1>

            <h2>User Reviews: </h2>
            <div className="flex flex-col space-y-3">
                <Link href="/review/1">link a review 1 dell'utente</Link>
                <Link href="/review/2">link a review 2 dell'utente</Link>
                <Link href="/review/3">link a review 3 dell'utente</Link>
            </div>
        </main>
    )
}