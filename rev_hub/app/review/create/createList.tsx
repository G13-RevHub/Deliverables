//questo è un componente esterno, per separare la parte client e server
"use client"

export default function CreateList() {

    return (
      <main className="">
            <form className="w-1/2">
                <label>
                    <span>Titolo:</span>
                    <input required type="text" name="title" />
                </label>
                <label>
                    <span>Tag:</span>
                    <input required type="text" name="tag" />
                </label>
                <label>
                    <span>Testo:</span>
                    <textarea required name="body" />
                </label>
                    <button type="submit" className="border-2 border-gray-600 p-2 mt-6">Invia</button>
                </form>
      </main>
    )
  }
  