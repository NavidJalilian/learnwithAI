import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { callGeminiAPI } from '@/lib/ai/gemini-config'

// Request validation schema
const AdaptContentSchema = z.object({
  currentContent: z.object({
    title: z.string(),
    content: z.string(),
    difficulty: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT']),
    type: z.string().optional(),
  }),
  targetDifficulty: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT']),
  userPerformance: z.object({
    score: z.number().min(0).max(100),
    timeSpent: z.number().min(0), // minutes
    attemptsCount: z.number().min(1),
    strugglingAreas: z.array(z.string()).optional(),
    strongAreas: z.array(z.string()).optional(),
  }),
  learningStyle: z.enum(['VISUAL', 'AUDITORY', 'KINESTHETIC', 'READING']),
  adaptationType: z.enum(['DIFFICULTY', 'STYLE', 'PACE', 'COMPREHENSIVE']).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate request body
    const validatedData = AdaptContentSchema.parse(body)
    
    // Determine adaptation strategy based on performance
    const getAdaptationStrategy = (score: number, attempts: number) => {
      if (score >= 90 && attempts <= 2) return 'INCREASE_DIFFICULTY'
      if (score >= 70 && score < 90) return 'MAINTAIN_WITH_ENRICHMENT'
      if (score >= 50 && score < 70) return 'PROVIDE_SUPPORT'
      if (score < 50 || attempts > 3) return 'SIMPLIFY_AND_REINFORCE'
      return 'MAINTAIN'
    }

    const strategy = getAdaptationStrategy(
      validatedData.userPerformance.score,
      validatedData.userPerformance.attemptsCount
    )

    // Create prompt for Gemini AI
    const prompt = `
      Adapt the following learning content based on user performance and requirements:
      
      CURRENT CONTENT:
      Title: ${validatedData.currentContent.title}
      Current Difficulty: ${validatedData.currentContent.difficulty}
      Content: ${validatedData.currentContent.content}
      
      USER PERFORMANCE:
      Score: ${validatedData.userPerformance.score}%
      Time Spent: ${validatedData.userPerformance.timeSpent} minutes
      Attempts: ${validatedData.userPerformance.attemptsCount}
      Struggling Areas: ${validatedData.userPerformance.strugglingAreas?.join(', ') || 'None specified'}
      Strong Areas: ${validatedData.userPerformance.strongAreas?.join(', ') || 'None specified'}
      
      ADAPTATION REQUIREMENTS:
      Target Difficulty: ${validatedData.targetDifficulty}
      Learning Style: ${validatedData.learningStyle}
      Adaptation Strategy: ${strategy}
      
      Please generate adapted content with the following JSON structure:
      {
        "adaptedContent": {
          "title": "Updated title if needed",
          "content": "Adapted content based on performance",
          "difficulty": "${validatedData.targetDifficulty}",
          "adaptations": [
            {
              "type": "difficulty|style|pace|support",
              "description": "What was changed and why",
              "originalValue": "previous state",
              "newValue": "new state"
            }
          ]
        },
        "recommendations": {
          "nextSteps": ["recommendation1", "recommendation2"],
          "additionalResources": [
            {
              "type": "practice|review|advanced|support",
              "title": "Resource title",
              "description": "Why this resource is recommended",
              "estimatedMinutes": number
            }
          ],
          "focusAreas": ["area1", "area2"],
          "strengthsToLeverage": ["strength1", "strength2"]
        },
        "performanceInsights": {
          "analysis": "Analysis of user performance",
          "improvementAreas": ["area1", "area2"],
          "successIndicators": ["indicator1", "indicator2"],
          "confidenceLevel": "low|medium|high"
        },
        "adaptationReason": "Explanation of why this adaptation was made"
      }
      
      Adaptation Guidelines based on strategy "${strategy}":
      
      INCREASE_DIFFICULTY:
      - Add more complex concepts and examples
      - Introduce advanced applications
      - Reduce scaffolding and hints
      - Add challenging exercises
      
      MAINTAIN_WITH_ENRICHMENT:
      - Keep current difficulty level
      - Add interesting extensions and applications
      - Provide optional advanced topics
      - Include real-world examples
      
      PROVIDE_SUPPORT:
      - Add more explanations and examples
      - Include additional practice opportunities
      - Provide more hints and guidance
      - Break down complex concepts
      
      SIMPLIFY_AND_REINFORCE:
      - Reduce complexity and cognitive load
      - Add more scaffolding and step-by-step guidance
      - Include prerequisite review
      - Provide multiple practice opportunities
      - Use simpler language and examples
      
      Learning Style Adaptations for ${validatedData.learningStyle}:
      - VISUAL: Add diagrams, charts, visual organizers, color coding
      - AUDITORY: Include verbal explanations, discussions, audio elements
      - KINESTHETIC: Add hands-on activities, interactive elements, movement
      - READING: Provide detailed text, written instructions, comprehensive notes
      
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
    let adaptedContent
    try {
      // Clean the response and extract JSON
      const jsonMatch = generatedText.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error('No valid JSON found in AI response')
      }
      adaptedContent = JSON.parse(jsonMatch[0])
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError)
      throw new Error('Invalid JSON response from AI')
    }

    // Add metadata
    const result = {
      success: true,
      data: {
        ...adaptedContent,
        id: `adaptation_${Date.now()}`,
        createdAt: new Date().toISOString(),
        originalContent: validatedData.currentContent,
        userPerformance: validatedData.userPerformance,
        adaptationStrategy: strategy,
        requestParams: {
          targetDifficulty: validatedData.targetDifficulty,
          learningStyle: validatedData.learningStyle,
          adaptationType: validatedData.adaptationType,
        }
      }
    }

    return NextResponse.json(result, { status: 200 })

  } catch (error) {
    console.error('Adapt content error:', error)
    
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
        error: error instanceof Error ? error.message : 'Failed to adapt content' 
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { 
      message: 'Content Adaptation API',
      endpoints: {
        POST: 'Adapt content based on user performance',
      },
      requiredFields: [
        'currentContent',
        'targetDifficulty',
        'userPerformance',
        'learningStyle'
      ]
    },
    { status: 200 }
  )
}
