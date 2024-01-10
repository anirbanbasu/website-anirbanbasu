import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './_components/Navbar'
import Footer from './_components/Footer'
import { Metadata, ResolvingMetadata } from 'next'
import { ProfileSummary } from '@/types/ProfileSummary'
import { getProfileSummary } from '@/sanity/client'

const inter = Inter({ subsets: ['latin'] })

const profileId = '2a886ccf-baf9-4c46-99cc-f7028d6a230b'

export async function generateMetadata(): Promise<Metadata> {
  // fetch data
  const profile:ProfileSummary = await getProfileSummary(profileId)
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
      </body>
    </html>
  )
}
