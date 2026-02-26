import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Healthcare Cost Calculator - Nigeria | Skydd Health Recap",
  description: "Calculate your real healthcare spending in Nigeria. Track medical expenses, see cost breakdowns, and discover how your spending compares to the average Nigerian. Get instant health cost estimates.",
  generator: "v0.app",
  keywords: "healthcare cost calculator, medical expenses Nigeria, health insurance, health spending tracker, medical cost estimator",
  authors: [{ name: "Skydd" }],
  openGraph: {
    title: "Healthcare Cost Calculator - Skydd Health Recap",
    description: "Discover your real healthcare spending in Nigeria with our health cost calculator.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
