import './style.css'

async function getTicket(id: number) {
    const tres = await fetch('http://localhost:4000/tickets/' + id)
    
    return tres.json()
  }

export default async function Page({params} : {params:any}) {
    const tick = await getTicket(params.id)
  
    return (
        <main className="flex flex-col min-h-screen items-center p-8">
            <div>
              <h2 className="title">{tick.title}</h2>
              <p className="author">{tick.author}</p> 
              <p>- {tick.data}</p>
              <p className="tag">{tick.tag}</p>
              <p className="body">{tick.body}</p>

            <button className="like__btn">
                <span id="icon"><i className="far fa-thumbs-up"></i></span>
                <span id="count">0</span> Like
            </button>
              
              <div className='commenti-div'>
              <h2 className="title">Commenti</h2>
              <div id="app">
                <div className="container">
                <div className="row">
                    <div className="col-6">
                    <div className="comment">
                    <p v-for="items in item" v-text="items"></p>
                    </div>
                    </div>
                    </div>
                <div className="row">
                    <div className="col-6">
                <textarea className="input" placeholder="Scrivi un commento" v-model="newItem" />
                    <button className='primaryContained float-right' type="submit">Invia</button>
                    </div>
                </div>
                </div>

            </div>
                <p className="comment">{tick.comment}</p>
            </div>
            </div>
      </main>
    )
  }