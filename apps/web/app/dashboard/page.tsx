'use client'

import React from 'react'
import { useAuth } from '@/lib/auth/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { 
  Brain, 
  BookOpen, 
  Target, 
  TrendingUp, 
  Clock, 
  Award,
  Plus,
  Play,
  BarChart3
} from 'lucide-react'

export default function DashboardPage() {
  const { user, loading, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin')
    }
  }, [user, loading, router])

  if (loading) {
    return <LoadingSpinner />
  }

  if (!user) {
    return null
  }

  const stats = [
    {
      title: 'Learning Streak',
      value: '7 days',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      title: 'Total XP',
      value: '1,250',
      icon: Award,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20'
    },
    {
      title: 'Lessons Completed',
      value: '23',
      icon: BookOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      title: 'Study Time',
      value: '12.5h',
      icon: Clock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    }
  ]

  const recentLearningPaths = [
    {
      id: 1,
      title: 'React Fundamentals',
      progress: 75,
      nextLesson: 'React Hooks',
      estimatedTime: '25 min'
    },
    {
      id: 2,
      title: 'Machine Learning Basics',
      progress: 40,
      nextLesson: 'Linear Regression',
      estimatedTime: '35 min'
    },
    {
      id: 3,
      title: 'TypeScript Mastery',
      progress: 90,
      nextLesson: 'Advanced Types',
      estimatedTime: '20 min'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Brain className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Welcome back, {user.displayName || 'Learner'}!
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Ready to continue your learning journey?
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={logout}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Learning Paths */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Your Learning Paths
                  </h2>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    New Path
                  </Button>
                </div>
              </div>
              <div className="p-6 space-y-4">
                {recentLearningPaths.map((path) => (
                  <div
                    key={path.id}
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {path.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Next: {path.nextLesson} • {path.estimatedTime}
                      </p>
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Progress</span>
                          <span className="text-gray-900 dark:text-white">{path.progress}%</span>
                        </div>
                        <div className="mt-1 w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${path.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <Button size="sm" className="ml-4">
                      <Play className="h-4 w-4 mr-2" />
                      Continue
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions & AI Assistant */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Target className="h-4 w-4 mr-2" />
                  Generate Learning Path
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Create Custom Lesson
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
              </div>
            </div>

            {/* AI Assistant */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800 p-6">
              <div className="flex items-center mb-4">
                <Brain className="h-6 w-6 text-blue-600 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  AI Assistant
                </h2>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Need help with your learning? Ask me anything!
              </p>
              <Button className="w-full">
                <Brain className="h-4 w-4 mr-2" />
                Chat with AI
              </Button>
            </div>

            {/* Today's Goal */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Today's Goal
              </h2>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">30 min</div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Study time remaining
                </p>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
                  <div className="bg-blue-600 h-3 rounded-full" style={{ width: '60%' }} />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  18 min completed
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
