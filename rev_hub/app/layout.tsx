import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'RevHub',
    description: 'Applicazione sviluppata dal gruppo G13',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
