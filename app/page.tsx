import HeroSection from '@/components/pages/HeroSection'
import JournalSection from '@/components/pages/JournalSection'
import QuotesSection from '@/components/pages/QuotesSection'
import Image from 'next/image'

export default function Home() {
  return (
    <div>
      <HeroSection
         heading='"Merevolusi Kesehatan Mental Melalui Setiap Garis Kata yang Digoreskan, Diary Kesehatan Mentalmu Dimulai Di Sini."' 
         message='~Journal Mental Health'
      />
      <JournalSection/>
      <QuotesSection/>
    </div>
  )
}
