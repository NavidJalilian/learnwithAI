import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { callGeminiAPI } from '@/lib/ai/gemini-config'

// Request validation schema
const GeneratePathSchema = z.object({
  userId: z.string().optional(),
  topic: z.string().min(1, 'Topic is required'),
  currentLevel: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT']),
  learningStyle: z.enum(['VISUAL', 'AUDITORY', 'KINESTHETIC', 'READING']),
  goals: z.array(z.string()).min(1, 'At least one goal is required'),
  timeAvailable: z.number().min(1).max(168), // hours per week
  duration: z.number().min(1).max(52).optional(), // weeks
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate request body
    const validatedData = GeneratePathSchema.parse(body)
    
    // Create prompt for Gemini AI
    const prompt = `
      Create a comprehensive learning path for the following requirements:
      
      Topic: ${validatedData.topic}
      Current Level: ${validatedData.currentLevel}
      Learning Style: ${validatedData.learningStyle}
      Goals: ${validatedData.goals.join(', ')}
      Time Available: ${validatedData.timeAvailable} hours per week
      Duration: ${validatedData.duration || 12} weeks
      
      Please generate a structured learning path with the following format:
      {
        "title": "Learning Path Title",
        "description": "Brief description of the learning journey",
        "estimatedHours": total_hours_number,
        "difficulty": "BEGINNER|INTERMEDIATE|ADVANCED|EXPERT",
        "milestones": [
          {
            "title": "Milestone Title",
            "description": "What will be learned",
            "topics": ["topic1", "topic2", "topic3"],
            "estimatedHours": hours_for_this_milestone,
            "week": week_number
          }
        ],
        "prerequisites": ["prerequisite1", "prerequisite2"],
        "learningOutcomes": ["outcome1", "outcome2", "outcome3"],
        "resources": [
          {
            "type": "lesson|exercise|project|quiz",
            "title": "Resource Title",
            "description": "Resource description",
            "estimatedMinutes": minutes_to_complete
          }
        ]
      }
      
      Make sure the path is:
      1. Tailored to the ${validatedData.learningStyle} learning style
      2. Appropriate for ${validatedData.currentLevel} level
      3. Achievable within ${validatedData.timeAvailable} hours per week
      4. Focused on achieving: ${validatedData.goals.join(', ')}
      5. Progressive and well-structured
      
      Return only valid JSON without any markdown formatting.
    `

    // Call Gemini API
    const response = await callGeminiAPI(prompt)
    
    // Extract the generated content
    const generatedText = response.candidates?.[0]?.content?.parts?.[0]?.text
    
    if (!generatedText) {
      throw new Error('No content generated from AI')
    }

    // Parse the JSON response
    let learningPath
    try {
      // Clean the response and extract JSON
      const jsonMatch = generatedText.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error('No valid JSON found in AI response')
      }
      learningPath = JSON.parse(jsonMatch[0])
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError)
      throw new Error('Invalid JSON response from AI')
    }

    // Add metadata
    const result = {
      success: true,
      data: {
        ...learningPath,
        id: `path_${Date.now()}`,
        createdAt: new Date().toISOString(),
        userId: validatedData.userId,
        requestParams: {
          topic: validatedData.topic,
          currentLevel: validatedData.currentLevel,
          learningStyle: validatedData.learningStyle,
          goals: validatedData.goals,
          timeAvailable: validatedData.timeAvailable,
        }
      }
    }

    return NextResponse.json(result, { status: 200 })

  } catch (error) {
    console.error('Generate path error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation error', 
          details: error.errors 
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to generate learning path' 
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { 
      message: 'Learning Path Generator API',
      endpoints: {
        POST: 'Generate a new learning path',
      },
      requiredFields: [
        'topic',
        'currentLevel',
        'learningStyle', 
        'goals',
        'timeAvailable'
      ]
    },
    { status: 200 }
  )
}
