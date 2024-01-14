import { Analytics } from '@vercel/analytics/react';
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './_components/Navbar'
import Footer from './_components/Footer'
import { Metadata } from 'next'
import { ProfileSummary } from '@/types/ProfileSummary'
import { getProfileSummary } from '@/sanity/client'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata(): Promise<Metadata> {
  // fetch data
  const profile:ProfileSummary = await getProfileSummary()
  return {
    title: profile.name,
    description: profile.tagLine,
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
