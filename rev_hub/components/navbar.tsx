import Link from 'next/link'
import './style.css'

export default function Footer() {
  return (
    <header className="header">
		<h1 className="logo"><Link href="/">RevHub</Link></h1>
      <ul className="main-nav">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/profile/2">Profilo</Link></li>
          <li><Link href="/search">Cerca</Link></li>
          <li><Link href="/review/1">Recensioni</Link></li>
          <li><Link href="/review/create">Crea</Link></li>
      </ul>
	</header> 


  )
}
