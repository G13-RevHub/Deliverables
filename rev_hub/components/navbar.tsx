import Link from "next/link";

export default function Footer() {
  return (
    <main>
      <Link href="/">Home</Link>
      <Link href="/profile/42">Profile</Link>
      <Link href="/review/69">Review</Link>
      <Link href="/review/create">Create</Link>
    </main>
  )
}