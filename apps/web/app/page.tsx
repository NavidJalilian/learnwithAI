import { Suspense } from 'react'
import { Hero } from '@/components/landing/hero'
import { Features } from '@/components/landing/features'
import { HowItWorks } from '@/components/landing/how-it-works'
import { Testimonials } from '@/components/landing/testimonials'
import { CTA } from '@/components/landing/cta'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { SectionLoadingSpinner } from '@/components/ui/loading-spinner'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <Suspense fallback={<SectionLoadingSpinner />}>
          <Hero />
        </Suspense>

        <Suspense fallback={<div className="h-96 bg-gray-100 dark:bg-gray-800 animate-pulse" />}>
          <Features />
        </Suspense>

        <Suspense fallback={<div className="h-96 bg-gray-50 dark:bg-gray-700 animate-pulse" />}>
          <HowItWorks />
        </Suspense>

        <Suspense fallback={<div className="h-96 bg-gray-100 dark:bg-gray-800 animate-pulse" />}>
          <Testimonials />
        </Suspense>

        <Suspense fallback={<div className="h-64 bg-gradient-to-br from-blue-600 to-purple-600 animate-pulse" />}>
          <CTA />
        </Suspense>
      </main>

      <Footer />
    </div>
  )
}
