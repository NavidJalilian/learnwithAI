'use client'

import React from 'react'
import { Brain, Target, Zap, BookOpen, TrendingUp, Users } from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'AI-Generated Content',
    description: 'Our advanced AI creates personalized lessons, exercises, and quizzes tailored to your learning style and pace.',
    color: 'text-blue-500'
  },
  {
    icon: Target,
    title: 'Adaptive Difficulty',
    description: 'Content automatically adjusts based on your performance, ensuring optimal challenge level for maximum learning.',
    color: 'text-purple-500'
  },
  {
    icon: Zap,
    title: 'Real-time Feedback',
    description: 'Get instant feedback and hints as you learn, helping you understand concepts faster and more effectively.',
    color: 'text-yellow-500'
  },
  {
    icon: BookOpen,
    title: 'Personalized Paths',
    description: 'Custom learning journeys designed around your goals, interests, and available time commitment.',
    color: 'text-green-500'
  },
  {
    icon: TrendingUp,
    title: 'Progress Tracking',
    description: 'Detailed analytics and insights into your learning progress, strengths, and areas for improvement.',
    color: 'text-red-500'
  },
  {
    icon: Users,
    title: 'Spaced Repetition',
    description: 'Scientifically-proven spaced repetition system ensures long-term retention of learned concepts.',
    color: 'text-indigo-500'
  }
]

export function Features() {
  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Powerful Features for
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Smart Learning</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Experience the future of education with AI-powered features designed to maximize your learning potential.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gray-50 dark:bg-gray-700 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Ready to experience the future of learning?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:scale-105">
              Start Free Trial
            </button>
            <button className="px-8 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
