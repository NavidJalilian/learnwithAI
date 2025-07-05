import { GoogleGenerativeAI } from '@google/generative-ai'
import { z } from 'zod'

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!)

// Content generation schemas
export const LessonContentSchema = z.object({
  title: z.string(),
  description: z.string(),
  content: z.object({
    introduction: z.string(),
    mainContent: z.array(z.object({
      type: z.enum(['text', 'example', 'exercise', 'tip']),
      content: z.string(),
      metadata: z.record(z.any()).optional(),
    })),
    summary: z.string(),
    keyTakeaways: z.array(z.string()),
  }),
  estimatedMinutes: z.number(),
  difficulty: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT']),
  prerequisites: z.array(z.string()).optional(),
})

export const QuizQuestionSchema = z.object({
  question: z.string(),
  type: z.enum(['multiple_choice', 'true_false', 'fill_blank', 'drag_drop']),
  options: z.array(z.string()).optional(),
  correctAnswer: z.union([z.string(), z.array(z.string())]),
  explanation: z.string(),
  difficulty: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT']),
  tags: z.array(z.string()).optional(),
})

export const LearningPathSchema = z.object({
  title: z.string(),
  description: z.string(),
  estimatedHours: z.number(),
  difficulty: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT']),
  milestones: z.array(z.object({
    title: z.string(),
    description: z.string(),
    topics: z.array(z.string()),
    estimatedHours: z.number(),
  })),
  prerequisites: z.array(z.string()).optional(),
})

export type LessonContent = z.infer<typeof LessonContentSchema>
export type QuizQuestion = z.infer<typeof QuizQuestionSchema>
export type LearningPath = z.infer<typeof LearningPathSchema>

export class GeminiService {
  private model = genAI.getGenerativeModel({ model: 'gemini-pro' })

  async generateLessonContent(
    topic: string,
    difficulty: string,
    learningStyle: string,
    context?: string
  ): Promise<LessonContent> {
    const prompt = `
      Create a comprehensive lesson about "${topic}" for ${difficulty} level learners with ${learningStyle} learning style.
      ${context ? `Additional context: ${context}` : ''}
      
      Requirements:
      - Make it engaging and interactive
      - Include practical examples
      - Add exercises or activities
      - Provide clear explanations
      - Estimate realistic completion time
      - Include key takeaways
      
      Return the response as a valid JSON object matching this structure:
      {
        "title": "string",
        "description": "string", 
        "content": {
          "introduction": "string",
          "mainContent": [
            {
              "type": "text|example|exercise|tip",
              "content": "string",
              "metadata": {}
            }
          ],
          "summary": "string",
          "keyTakeaways": ["string"]
        },
        "estimatedMinutes": number,
        "difficulty": "BEGINNER|INTERMEDIATE|ADVANCED|EXPERT",
        "prerequisites": ["string"]
      }
    `

    try {
      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const text = response.text()
      
      // Extract JSON from response
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error('No valid JSON found in response')
      }
      
      const parsedContent = JSON.parse(jsonMatch[0])
      return LessonContentSchema.parse(parsedContent)
    } catch (error) {
      console.error('Error generating lesson content:', error)
      throw new Error('Failed to generate lesson content')
    }
  }

  async generateQuizQuestions(
    topic: string,
    difficulty: string,
    count: number = 5
  ): Promise<QuizQuestion[]> {
    const prompt = `
      Generate ${count} quiz questions about "${topic}" for ${difficulty} level.
      
      Requirements:
      - Mix different question types (multiple choice, true/false, fill in blank)
      - Include clear explanations for correct answers
      - Make questions challenging but fair
      - Cover different aspects of the topic
      
      Return as a JSON array of questions matching this structure:
      [
        {
          "question": "string",
          "type": "multiple_choice|true_false|fill_blank|drag_drop",
          "options": ["string"] (for multiple choice),
          "correctAnswer": "string" or ["string"],
          "explanation": "string",
          "difficulty": "BEGINNER|INTERMEDIATE|ADVANCED|EXPERT",
          "tags": ["string"]
        }
      ]
    `

    try {
      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const text = response.text()
      
      const jsonMatch = text.match(/\[[\s\S]*\]/)
      if (!jsonMatch) {
        throw new Error('No valid JSON array found in response')
      }
      
      const parsedQuestions = JSON.parse(jsonMatch[0])
      return z.array(QuizQuestionSchema).parse(parsedQuestions)
    } catch (error) {
      console.error('Error generating quiz questions:', error)
      throw new Error('Failed to generate quiz questions')
    }
  }

  async generateLearningPath(
    subject: string,
    userLevel: string,
    goals: string[],
    timeAvailable: number // hours per week
  ): Promise<LearningPath> {
    const prompt = `
      Create a personalized learning path for "${subject}" for a ${userLevel} level learner.
      
      User goals: ${goals.join(', ')}
      Available time: ${timeAvailable} hours per week
      
      Requirements:
      - Break down into logical milestones (3-5 major milestones)
      - Each milestone should have 4-6 topics
      - Provide realistic time estimates
      - Ensure proper progression and prerequisites
      - Make it achievable and motivating
      
      Return as JSON matching this structure:
      {
        "title": "string",
        "description": "string",
        "estimatedHours": number,
        "difficulty": "BEGINNER|INTERMEDIATE|ADVANCED|EXPERT",
        "milestones": [
          {
            "title": "string",
            "description": "string", 
            "topics": ["string"],
            "estimatedHours": number
          }
        ],
        "prerequisites": ["string"]
      }
    `

    try {
      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const text = response.text()
      
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error('No valid JSON found in response')
      }
      
      const parsedPath = JSON.parse(jsonMatch[0])
      return LearningPathSchema.parse(parsedPath)
    } catch (error) {
      console.error('Error generating learning path:', error)
      throw new Error('Failed to generate learning path')
    }
  }

  async generatePersonalizedFeedback(
    userProgress: any,
    performanceData: any,
    learningStyle: string
  ): Promise<string> {
    const prompt = `
      Analyze this learner's progress and provide personalized feedback:
      
      Progress: ${JSON.stringify(userProgress)}
      Performance: ${JSON.stringify(performanceData)}
      Learning Style: ${learningStyle}
      
      Provide:
      - Specific strengths and areas for improvement
      - Personalized recommendations
      - Motivational encouragement
      - Next steps suggestions
      
      Keep it concise, positive, and actionable.
    `

    try {
      const result = await this.model.generateContent(prompt)
      const response = await result.response
      return response.text()
    } catch (error) {
      console.error('Error generating feedback:', error)
      throw new Error('Failed to generate personalized feedback')
    }
  }

  async adaptDifficulty(
    currentContent: any,
    userPerformance: any,
    targetDifficulty: string
  ): Promise<any> {
    const prompt = `
      Adapt this learning content based on user performance:
      
      Current Content: ${JSON.stringify(currentContent)}
      User Performance: ${JSON.stringify(userPerformance)}
      Target Difficulty: ${targetDifficulty}
      
      Adjust the content difficulty while maintaining learning objectives.
      Return the adapted content in the same format.
    `

    try {
      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const text = response.text()
      
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error('No valid JSON found in response')
      }
      
      return JSON.parse(jsonMatch[0])
    } catch (error) {
      console.error('Error adapting difficulty:', error)
      throw new Error('Failed to adapt content difficulty')
    }
  }
}

export const geminiService = new GeminiService()
