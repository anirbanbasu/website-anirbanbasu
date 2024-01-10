import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Metadata, ResolvingMetadata } from 'next'
import { ProfileSummary } from '@/types/ProfileSummary'
import { getProfileSummary } from '@/sanity/client'

const inter = Inter({ subsets: ['latin'] })

const profileId = '2a886ccf-baf9-4c46-99cc-f7028d6a230b'

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
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
