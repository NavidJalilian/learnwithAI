import { Suspense } from 'react'
import { Hero } from '@/components/landing/Hero'
import { Features } from '@/components/landing/Features'
import { Header } from '@/components/landing/Header'
import { Footer } from '@/components/landing/Footer'
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

        {/* Placeholder for additional sections */}
        <section className="py-24 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Transform Your Learning?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Join thousands of learners who are already experiencing the power of AI-driven education.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Get Started Free
              </button>
              <button className="px-8 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
