// Gemini API configuration
export const GEMINI_CONFIG = {
  apiKey: process.env.GOOGLE_AI_API_KEY,
  baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
  model: 'gemini-2.0-flash',
}

// Validate API key
if (!GEMINI_CONFIG.apiKey) {
  throw new Error('GOOGLE_AI_API_KEY environment variable is required')
}

// Utility function to make Gemini API calls
export async function callGeminiAPI(prompt: string) {
  const response = await fetch(
    `${GEMINI_CONFIG.baseUrl}/models/${GEMINI_CONFIG.model}:generateContent`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': GEMINI_CONFIG.apiKey!,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    }
  )

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

// Example usage function
export async function testGeminiConnection() {
  try {
    const result = await callGeminiAPI('Explain how AI works in a few words')
    console.log('Gemini API test successful:', result)
    return result
  } catch (error) {
    console.error('Gemini API test failed:', error)
    throw error
  }
}
