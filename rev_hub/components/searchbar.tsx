/* "use client" */

export default function Searchbar() {
    const handleSearchSubmit = (event: any) => {
        event.preventDefault()
    }
    return (
        <div>
            <form onSubmit={handleSearchSubmit} className="flex items-center space-x-3">
                <input type="text" name="term" required />
                <button type="submit" name="inviaterm" className="border-2 border-gray-600 py-0">Cerca</button>
            </form>
        </div>
    )
}
