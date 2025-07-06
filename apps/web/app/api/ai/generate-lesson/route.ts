import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { callGeminiAPI } from '@/lib/ai/gemini-config'

// Request validation schema
const GenerateLessonSchema = z.object({
  topic: z.string().min(1, 'Topic is required'),
  difficulty: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT']),
  learningStyle: z.enum(['VISUAL', 'AUDITORY', 'KINESTHETIC', 'READING']),
  lessonType: z.enum(['THEORY', 'PRACTICE', 'PROJECT', 'ASSESSMENT']).optional(),
  duration: z.number().min(5).max(180), // minutes
  userContext: z.object({
    previousLessons: z.array(z.string()).optional(),
    strengths: z.array(z.string()).optional(),
    weaknesses: z.array(z.string()).optional(),
    preferences: z.array(z.string()).optional(),
  }).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate request body
    const validatedData = GenerateLessonSchema.parse(body)
    
    // Create prompt for Gemini AI
    const prompt = `
      Create an interactive lesson for the following requirements:
      
      Topic: ${validatedData.topic}
      Difficulty: ${validatedData.difficulty}
      Learning Style: ${validatedData.learningStyle}
      Lesson Type: ${validatedData.lessonType || 'THEORY'}
      Duration: ${validatedData.duration} minutes
      ${validatedData.userContext?.previousLessons ? `Previous Lessons: ${validatedData.userContext.previousLessons.join(', ')}` : ''}
      ${validatedData.userContext?.strengths ? `User Strengths: ${validatedData.userContext.strengths.join(', ')}` : ''}
      ${validatedData.userContext?.weaknesses ? `Areas to Focus: ${validatedData.userContext.weaknesses.join(', ')}` : ''}
      
      Please generate a comprehensive lesson with the following JSON structure:
      {
        "title": "Lesson Title",
        "description": "Brief lesson description",
        "content": {
          "introduction": "Engaging introduction to the topic",
          "mainContent": [
            {
              "type": "text|example|exercise|tip|quiz",
              "title": "Section Title",
              "content": "Section content",
              "metadata": {
                "difficulty": "easy|medium|hard",
                "estimatedMinutes": number,
                "interactionType": "read|practice|solve|answer"
              }
            }
          ],
          "summary": "Key points summary",
          "keyTakeaways": ["takeaway1", "takeaway2", "takeaway3"]
        },
        "estimatedMinutes": ${validatedData.duration},
        "difficulty": "${validatedData.difficulty}",
        "prerequisites": ["prerequisite1", "prerequisite2"],
        "learningObjectives": ["objective1", "objective2", "objective3"],
        "exercises": [
          {
            "type": "multiple_choice|fill_blank|code|drag_drop",
            "question": "Exercise question",
            "options": ["option1", "option2", "option3", "option4"],
            "correctAnswer": "correct_answer_or_index",
            "explanation": "Why this is correct",
            "hints": ["hint1", "hint2"]
          }
        ],
        "resources": [
          {
            "type": "article|video|documentation|tool",
            "title": "Resource Title",
            "url": "https://example.com",
            "description": "Resource description"
          }
        ]
      }
      
      Tailor the lesson for ${validatedData.learningStyle} learners:
      - VISUAL: Include diagrams, charts, visual examples, step-by-step illustrations
      - AUDITORY: Include explanations, discussions, verbal examples, sound-based mnemonics
      - KINESTHETIC: Include hands-on exercises, interactive elements, practical applications
      - READING: Include detailed text, written examples, comprehensive explanations
      
      Make sure the content is:
      1. Appropriate for ${validatedData.difficulty} level
      2. Completable in approximately ${validatedData.duration} minutes
      3. Interactive and engaging
      4. Includes practical examples and exercises
      5. Progressive in difficulty within the lesson
      
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
    let lesson
    try {
      // Clean the response and extract JSON
      const jsonMatch = generatedText.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error('No valid JSON found in AI response')
      }
      lesson = JSON.parse(jsonMatch[0])
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError)
      throw new Error('Invalid JSON response from AI')
    }

    // Add metadata
    const result = {
      success: true,
      data: {
        ...lesson,
        id: `lesson_${Date.now()}`,
        createdAt: new Date().toISOString(),
        requestParams: {
          topic: validatedData.topic,
          difficulty: validatedData.difficulty,
          learningStyle: validatedData.learningStyle,
          lessonType: validatedData.lessonType,
          duration: validatedData.duration,
        }
      }
    }

    return NextResponse.json(result, { status: 200 })

  } catch (error) {
    console.error('Generate lesson error:', error)
    
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
        error: error instanceof Error ? error.message : 'Failed to generate lesson' 
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { 
      message: 'Lesson Generator API',
      endpoints: {
        POST: 'Generate a new lesson',
      },
      requiredFields: [
        'topic',
        'difficulty',
        'learningStyle',
        'duration'
      ]
    },
    { status: 200 }
  )
}
