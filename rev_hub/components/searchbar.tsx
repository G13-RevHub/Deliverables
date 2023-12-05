import { useState } from 'react'

export default function Searchbar() {
    const [results, setResults] = useState<any[]>([])

    const handleSearchSubmit = (event: any) => {
        event.preventDefault()

        const results = [{ name: "res1" }, { name: "res2" }]
        setResults(results)
        console.log(results)
    }
    return (
        <form onSubmit={handleSearchSubmit} className="py-1 px-3 w-4/5 mx-16 flex items-center space-x-3">
            <input type="text" name="term" required />
            <button type="submit" name="inviaterm" className="border-2 border-gray-600 py-0">Cerca</button>
        </form>
    )
}
