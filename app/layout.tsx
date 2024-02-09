import { Analytics } from '@vercel/analytics/react';
import { Montserrat } from 'next/font/google'
import './globals.css'
import Navbar from './_components/Navbar'
import Footer from './_components/Footer'

const montserrat = Montserrat({ subsets: ['latin', 'latin-ext'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  //Do we need a background wave pattern> <div className="bg-[url('/wave-pattern.svg')] bg-auto bg-origin-content bg-clip-padding bg-no-repeat bg-center"></div>
  return (
    <html data-theme="pastel" lang="en">
      <body className={montserrat.className}>
        <Navbar />
        
          {children}
          <Footer />
        <Analytics />
      </body>
    </html>
  )
}
