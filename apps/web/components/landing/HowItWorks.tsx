'use client'

import React from 'react'
import { UserPlus, Brain, Target, TrendingUp } from 'lucide-react'

const steps = [
  {
    icon: UserPlus,
    title: 'Create Your Profile',
    description: 'Tell us about your learning goals, current knowledge level, and preferred learning style.',
    step: '01'
  },
  {
    icon: Brain,
    title: 'AI Generates Your Path',
    description: 'Our AI analyzes your profile and creates a personalized learning journey with custom content.',
    step: '02'
  },
  {
    icon: Target,
    title: 'Learn & Practice',
    description: 'Engage with interactive lessons, exercises, and quizzes that adapt to your progress in real-time.',
    step: '03'
  },
  {
    icon: TrendingUp,
    title: 'Track & Improve',
    description: 'Monitor your progress, identify strengths and weaknesses, and continuously optimize your learning.',
    step: '04'
  }
]

export function HowItWorks() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            How It
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Works</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Get started with AI-powered learning in just four simple steps.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-4">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connection line (desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800 z-0" />
                )}

                <div className="relative bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 z-10">
                  {/* Step number */}
                  <div className="absolute -top-4 left-8">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {step.step}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="mb-6 pt-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                      <step.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom section */}
        <div className="text-center mt-16">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Start Your Learning Journey?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Join thousands of learners who are already experiencing the power of AI-driven education.
            </p>
            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:scale-105">
              Get Started Now
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
