'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, CheckCircle } from 'lucide-react'

const benefits = [
  'Personalized AI-generated content',
  'Adaptive difficulty adjustment',
  'Real-time progress tracking',
  'Spaced repetition system',
  'Interactive exercises & quizzes',
  '24/7 AI learning assistant'
]

export function CTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      
      <div className="relative container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-white mb-8">
            <Sparkles className="h-4 w-4 mr-2" />
            Limited Time: Free Premium Trial
          </div>

          {/* Main heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-6">
            Start Your AI-Powered
            <br />
            Learning Journey Today
          </h2>

          {/* Subheading */}
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of learners who are already experiencing the future of education. 
            Get personalized content, adaptive difficulty, and real-time feedback.
          </p>

          {/* Benefits grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12 max-w-3xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center text-left text-blue-100">
                <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                <span className="text-sm">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button 
              size="lg" 
              className="text-lg px-8 py-4 h-auto bg-white text-blue-600 hover:bg-blue-50 hover:text-blue-700" 
              asChild
            >
              <Link href="/auth/signup">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-4 h-auto border-white/30 text-white hover:bg-white/10" 
              asChild
            >
              <Link href="/demo">
                Watch Demo
              </Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="text-center">
            <p className="text-blue-200 text-sm mb-4">
              Trusted by learners from top companies
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="text-white font-semibold">Google</div>
              <div className="text-white font-semibold">Microsoft</div>
              <div className="text-white font-semibold">Apple</div>
              <div className="text-white font-semibold">Meta</div>
              <div className="text-white font-semibold">Netflix</div>
            </div>
          </div>
        </div>

        {/* Bottom guarantee */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 text-white">
            <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
            <span className="text-sm">30-day money-back guarantee • No credit card required</span>
          </div>
        </div>
      </div>
    </section>
  )
}
