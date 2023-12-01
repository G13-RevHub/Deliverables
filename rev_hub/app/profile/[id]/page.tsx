"use client"

export default function ID({params} : {params:number}) {
    const id = params
  
    return (
      <main className="">
            <h1>{id}</h1>
      </main>
    )
  }