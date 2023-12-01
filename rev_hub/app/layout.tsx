import type { Metadata } from 'next'
import './globals.css'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'

export const metadata: Metadata = {
    title: 'RevHub',
    description: 'Applicazione sviluppata dal gruppo G13',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="min-h-screen flex flex-col justify-between">
                <Navbar/>
                {children}
                <Footer banane={5} mele={10} />
            </body>
        </html>
    )
}
