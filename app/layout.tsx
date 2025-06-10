import type React from "react"
import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import './globals.css';
// import Header from "@/components/header"; // If you have a separate Header component

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GreenHub",
  description: "GreenHub: Tu tienda de plantas y flores.",
  icons: {
    icon: "/favicono.png",
    apple: "/favicono.png",
  },
    generator: 'greenhub.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {/* <Header /> */} {/* If header is part of layout */}
        {children}
      </body>
    </html>
  )
}
