async function getPage(id: number) {
  return id
}

async function getTicket(id: number) {
  const tres = await fetch('http://localhost:4000/tickets/' + id)
  
  return tres.json()
}

export default async function Page({params} : {params:any}) {
  const id = await getPage(params.id)
  const tick = await getTicket(params.id)
  
    return (
      <main>
            <h1>ID Author: {id}</h1>
            <p>Body: {tick.body}</p>
      </main>
    )
}