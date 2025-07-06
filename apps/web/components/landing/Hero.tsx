'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, Brain, Target } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />
      
      <div className="relative container mx-auto px-4 py-24 sm:py-32">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium mb-8 bg-white/50 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 mr-2 text-yellow-500" />
            AI-Powered Adaptive Learning
          </div>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
            Learn Anything with{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Guidance
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Experience personalized learning that adapts to your pace, style, and goals. 
            Our AI creates custom lessons, tracks your progress, and optimizes your learning journey.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="text-lg px-8 py-4 h-auto" asChild>
              <Link href="/auth/signup">
                Start Learning Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 h-auto" asChild>
              <Link href="/demo">
                Watch Demo
              </Link>
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <Brain className="h-5 w-5 text-blue-500" />
              <span>AI-Generated Content</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <Target className="h-5 w-5 text-purple-500" />
              <span>Adaptive Difficulty</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <Sparkles className="h-5 w-5 text-yellow-500" />
              <span>Personalized Paths</span>
            </div>
          </div>
        </div>

        {/* Hero image/demo placeholder */}
        <div className="mt-16 relative max-w-5xl mx-auto">
          <div className="relative rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 p-8 shadow-2xl">
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Brain className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  Interactive Learning Dashboard
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Coming soon - AI-powered learning interface
                </p>
              </div>
            </div>
          </div>
          
          {/* Floating elements */}
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-500/10 rounded-full blur-xl" />
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-500/10 rounded-full blur-xl" />
        </div>
      </div>
    </section>
  )
}
