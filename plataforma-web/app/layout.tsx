import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SafeCafé - Análise Preditiva para Café Arábica",
  description: "Sistema IoT especializado em monitoramento e análise preditiva para Coffea arabica de montanha",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-cream min-h-screen`}>{children}</body>
    </html>
  )
}
