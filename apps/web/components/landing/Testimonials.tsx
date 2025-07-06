'use client'

import React from 'react'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Software Developer',
    avatar: '/avatars/sarah.jpg',
    content: 'LearnWithAI completely transformed how I learn new programming languages. The AI adapts to my pace and creates exercises that challenge me just enough.',
    rating: 5
  },
  {
    name: 'Marcus Johnson',
    role: 'Data Scientist',
    avatar: '/avatars/marcus.jpg',
    content: 'The personalized learning paths are incredible. I went from knowing nothing about machine learning to building my first model in just 6 weeks.',
    rating: 5
  },
  {
    name: 'Elena Rodriguez',
    role: 'Product Manager',
    avatar: '/avatars/elena.jpg',
    content: 'As someone who learns better with visual content, the AI perfectly adapted to my learning style. The progress tracking keeps me motivated.',
    rating: 5
  },
  {
    name: 'David Kim',
    role: 'Student',
    avatar: '/avatars/david.jpg',
    content: 'The spaced repetition system helped me retain information much better than traditional studying. My grades improved significantly.',
    rating: 5
  },
  {
    name: 'Lisa Thompson',
    role: 'UX Designer',
    avatar: '/avatars/lisa.jpg',
    content: 'I love how the AI generates real-world examples and projects. It makes learning practical and immediately applicable to my work.',
    rating: 5
  },
  {
    name: 'Ahmed Hassan',
    role: 'Entrepreneur',
    avatar: '/avatars/ahmed.jpg',
    content: 'The adaptive difficulty feature is game-changing. It keeps me in the perfect learning zone - not too easy, not too hard.',
    rating: 5
  }
]

export function Testimonials() {
  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            What Our
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Learners Say</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Join thousands of successful learners who have transformed their skills with AI-powered education.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="h-8 w-8 text-blue-600" />
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              {/* Hover effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* Stats section */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              10K+
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              Active Learners
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              95%
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              Success Rate
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              50+
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              Learning Topics
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              4.9★
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              Average Rating
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
