import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import Header from '@/components/layouts/Header'
import Footer from '@/components/layouts/Footer'
import AuthProvider from '@/components/layouts/AuthProvider'

const inter = Poppins({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata: Metadata = {
  title: 'Jurnal Mental Healthku',
  description: 'Aplikasi Jurnal untuk Tracking Journal Diary harianmu',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Header/>
          {children}
          <Footer/>
        </AuthProvider>
      </body>
    </html>
  )
}
