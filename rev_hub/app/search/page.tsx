export default function Form() {
  return (
    <main className="">
          <h2>Puoi cercare recensioni e utenti</h2>
            <form method="post"> 
              <input type="text" name="term" required />
              <input type="submit" name="inviaterm" className="border-2 border-gray-600 p-2 mt-6" value="Cerca" />
            </form>
    </main>
  )
}
