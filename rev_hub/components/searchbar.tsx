import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Searchbar() {
    const [text_to_search, setTextToSearch] = useState("")
    const router = useRouter()

    const handleSearchSubmit = (event: any) => {
        event.preventDefault()

        let txt = ""
        let api_to_call = "review"

        if (text_to_search.charAt(0) === '@')
            api_to_call = "user"
        else if (text_to_search.charAt(0) === '#')
            api_to_call = "tag"

        if(api_to_call === "tag") {
            if(text_to_search.includes(" ")) {
                alert("Un tag non può contenere spazi")
                return
            }
        }

        if(api_to_call === "user") {
            if(text_to_search.includes(" ")) {
                alert("Uno user non può contenere spazi")
                return
            }
        }

        txt = text_to_search.replaceAll('@', '').replaceAll('#', '').replaceAll("/", "")
        if (txt.length === 0) return

        router.push(`/search/${api_to_call}/${txt}`)
    }
    return (
        <form onSubmit={handleSearchSubmit} className="py-1 px-3 w-4/5 mx-16 flex items-center space-x-3">
            <input type="text" name="term" className='text-gray-600'
                   placeholder="@user / #tag / some text..."
                   required value={text_to_search} onChange={e => setTextToSearch(e.target.value)} />
            <button type="submit" name="inviaterm" className="border-2 border-gray-600 py-0 text-gray-600">Cerca</button>
        </form>
    )
}
