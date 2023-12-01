import './style.css'

export default function Footer() {
  return (
    <header className="header">
		<h1 className="logo"><a href="#">RevHub</a></h1>
      <ul className="main-nav">
          <li><a href="/">Home</a></li>
          <li><a href="/profile/42">Profilo</a></li>
          <li><a href="/search">Cerca</a></li>
          <li><a href="/review/69">Recensioni</a></li>
          <li><a href="/create">Crea</a></li>
      </ul>
	</header> 


  )
}
