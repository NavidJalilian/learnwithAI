# LearnWithAI Development Guide

## 🚀 Phase 2 Implementation Details

### AI Integration Architecture

#### Google Gemini Pro Service
The core AI service handles content generation and adaptation:

```typescript
// Generate personalized lesson content
const lesson = await googleAI.generateLessonContent({
  topic: "React Hooks",
  difficulty: "INTERMEDIATE",
  learningStyle: "VISUAL",
  lessonType: "PRACTICE",
  duration: 45
})

// Adapt content difficulty
const adapted = await googleAI.adaptContentDifficulty(
  content, 
  "BEGINNER", 
  "INTERMEDIATE", 
  userScore
)
```

#### Learning Engine
Manages learning paths and progression:

```typescript
// Generate personalized learning path
const path = await learningEngine.generatePersonalizedPath({
  userId: "user-123",
  topic: "JavaScript",
  currentLevel: "BEGINNER",
  learningStyle: "VISUAL",
  goals: ["Build apps"],
  timeAvailable: 10
})

// Get next lesson based on progress
const nextLesson = await learningEngine.generateNextLesson(
  userId,
  currentPath,
  completedLessons,
  performanceData
)
```

#### Adaptive Content System
Real-time content adaptation based on user behavior:

```typescript
// Analyze and adapt content
const adaptedLesson = await adaptiveContent.adaptContentInRealTime({
  userId,
  currentLesson,
  performanceHistory,
  realTimeMetrics: {
    timeOnSection: 120,
    scrollBehavior: 'slow',
    interactionLevel: 'low'
  }
})
```

### Component Architecture

#### Learning Path Generator
Interactive UI for creating personalized learning paths:

```tsx
<LearningPathGenerator 
  userId={user.id}
  onPathGenerated={(path) => {
    // Handle generated path
    setCurrentPath(path)
    router.push('/learn')
  }}
/>
```

#### Lesson Viewer
Adaptive lesson display with progress tracking:

```tsx
<LessonViewer 
  lesson={currentLesson}
  onComplete={() => markLessonComplete()}
  onProgress={(progress) => updateProgress(progress)}
/>
```

### API Endpoints

#### Generate Learning Path
```bash
POST /api/ai/generate-path
Content-Type: application/json

{
  "userId": "user-123",
  "topic": "Machine Learning",
  "currentLevel": "BEGINNER",
  "learningStyle": "VISUAL",
  "goals": ["Career change", "Build projects"],
  "timeAvailable": 15
}
```

#### Generate Lesson Content
```bash
POST /api/ai/generate-lesson
Content-Type: application/json

{
  "topic": "Neural Networks",
  "difficulty": "INTERMEDIATE",
  "learningStyle": "KINESTHETIC",
  "lessonType": "PRACTICE",
  "duration": 60,
  "userContext": {
    "previousLessons": ["intro-to-ml", "linear-regression"],
    "strengths": ["mathematics", "programming"],
    "weaknesses": ["statistics"]
  }
}
```

### Testing AI Features

#### Unit Tests
```typescript
// Test AI service
describe('GoogleAIService', () => {
  it('should generate lesson content', async () => {
    const request = {
      topic: 'JavaScript Basics',
      difficulty: 'BEGINNER',
      learningStyle: 'VISUAL',
      lessonType: 'THEORY',
      duration: 30
    }
    
    const result = await googleAI.generateLessonContent(request)
    expect(result.success).toBe(true)
    expect(result.data).toBeDefined()
  })
})
```

#### Integration Tests
```typescript
// Test API endpoints
describe('/api/ai/generate-path', () => {
  it('should create learning path', async () => {
    const response = await fetch('/api/ai/generate-path', {
      method: 'POST',
      body: JSON.stringify(validRequest)
    })
    
    expect(response.ok).toBe(true)
    const data = await response.json()
    expect(data.success).toBe(true)
  })
})
```

### Performance Optimization

#### AI Response Caching
```typescript
// Cache frequently requested content
const cacheKey = `lesson-${topic}-${difficulty}-${learningStyle}`
const cached = await redis.get(cacheKey)

if (cached) {
  return JSON.parse(cached)
}

const generated = await googleAI.generateLessonContent(request)
await redis.setex(cacheKey, 3600, JSON.stringify(generated))
```

#### Batch Processing
```typescript
// Process multiple requests efficiently
const batchRequests = users.map(user => ({
  userId: user.id,
  topic: user.currentTopic,
  // ... other params
}))

const results = await Promise.all(
  batchRequests.map(req => learningEngine.generatePersonalizedPath(req))
)
```

### Error Handling

#### AI Service Errors
```typescript
try {
  const result = await googleAI.generateLessonContent(request)
  if (!result.success) {
    // Handle AI generation failure
    return fallbackContent
  }
  return result.data
} catch (error) {
  // Handle network/API errors
  logger.error('AI service error:', error)
  throw new AIServiceError('Content generation failed')
}
```

#### Graceful Degradation
```typescript
// Fallback to static content if AI fails
const generateLessonWithFallback = async (request) => {
  try {
    return await googleAI.generateLessonContent(request)
  } catch (error) {
    return getStaticLessonContent(request.topic)
  }
}
```

### Monitoring & Analytics

#### AI Usage Tracking
```typescript
// Track AI API usage
const trackAIUsage = (endpoint, tokens, duration) => {
  analytics.track('ai_api_call', {
    endpoint,
    tokens_used: tokens,
    response_time: duration,
    timestamp: new Date()
  })
}
```

#### Performance Metrics
```typescript
// Monitor learning effectiveness
const trackLearningMetrics = (userId, lessonId, performance) => {
  analytics.track('lesson_completed', {
    user_id: userId,
    lesson_id: lessonId,
    score: performance.score,
    time_spent: performance.timeSpent,
    adaptations_made: performance.adaptations
  })
}
```

### Deployment Considerations

#### Environment Variables
```bash
# Required for AI features
GOOGLE_AI_API_KEY=your_gemini_api_key
AI_RATE_LIMIT=100  # requests per minute
AI_CACHE_TTL=3600  # cache duration in seconds
```

#### Scaling AI Services
```typescript
// Load balancing for AI requests
const aiServicePool = [
  new GoogleAIService(config1),
  new GoogleAIService(config2),
  new GoogleAIService(config3)
]

const getAvailableService = () => {
  return aiServicePool.find(service => !service.isRateLimited())
}
```

### Future Enhancements

#### Advanced AI Features
- Multi-language content generation
- Voice-based lesson delivery
- Image and video content creation
- Advanced learning analytics

#### Performance Improvements
- Edge caching for AI responses
- Predictive content pre-generation
- Real-time collaboration features
- Advanced personalization algorithms

---

**Phase 2 is complete with a fully functional AI-powered learning system!**
