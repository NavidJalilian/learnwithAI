# Environment Setup Guide

## 🔐 API Keys Configuration

Your environment has been configured with the following API keys:

### Firebase Configuration
- **Project ID**: `zettelai-y9lc4`
- **API Key**: `AIzaSyBK_rRZH1ytzGOMu48bDHQhSrKFPUN27pY`
- **Auth Domain**: `zettelai-y9lc4.firebaseapp.com`
- **Storage Bucket**: `zettelai-y9lc4.firebasestorage.app`
- **Messaging Sender ID**: `759889687872`
- **App ID**: `1:759889687872:web:50b2878726b3c6106876a5`

### Google AI (Gemini) Configuration
- **API Key**: `AIzaSyAIPcG5VgAmQ6raOLmHLQ_ZgwI97weu40Y`
- **Model**: `gemini-2.0-flash`

## 📁 Files Created/Updated

### Environment Files
- `.env.local` - Contains all your API keys and configuration
- `.gitignore` - Updated to exclude sensitive environment files

### Firebase Configuration
- `apps/web/lib/firebase/config.ts` - Firebase initialization with environment variables
- `apps/web/lib/auth/auth-context.tsx` - Authentication context provider

### AI Configuration
- `apps/web/lib/ai/gemini-config.ts` - Gemini API configuration and utilities

### UI Components
- `apps/web/lib/progress/progress-context.tsx` - Progress tracking context
- `apps/web/components/ui/toaster.tsx` - Toast notification component

## 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Test API Connections**
   ```bash
   # Test Gemini API
   curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent" \
     -H 'Content-Type: application/json' \
     -H 'X-goog-api-key: AIzaSyAIPcG5VgAmQ6raOLmHLQ_ZgwI97weu40Y' \
     -X POST \
     -d '{
       "contents": [
         {
           "parts": [
             {
               "text": "Explain how AI works in a few words"
             }
           ]
         }
       ]
     }'
   ```

## 🔧 Configuration Details

### Firebase Setup
The Firebase configuration is now properly set up to use environment variables. The configuration includes:
- Authentication with Google provider support
- Firestore database
- Cloud Storage
- Proper error handling and validation

### Gemini AI Setup
The Gemini AI service is configured to use the latest `gemini-2.0-flash` model with your API key.

### Security Best Practices
- All sensitive API keys are stored in `.env.local`
- Environment files are excluded from version control
- Proper validation for required environment variables
- Error handling for missing configuration

## 🧪 Testing Your Setup

### Test Firebase Connection
```typescript
import { auth } from '@/lib/firebase/config'
console.log('Firebase Auth:', auth.app.name)
```

### Test Gemini API
```typescript
import { testGeminiConnection } from '@/lib/ai/gemini-config'
await testGeminiConnection()
```

## 🔒 Security Notes

1. **Never commit `.env.local`** - It's already in `.gitignore`
2. **Rotate API keys regularly** for security
3. **Use Firebase security rules** to protect your data
4. **Monitor API usage** to prevent unexpected charges

## 🐛 Troubleshooting

### Common Issues

1. **Firebase Auth Error**
   - Check that all Firebase environment variables are set
   - Verify your Firebase project settings
   - Ensure authentication providers are enabled

2. **Gemini API Error**
   - Verify the API key is correct
   - Check API quotas and billing
   - Ensure the model name is correct

3. **Environment Variables Not Loading**
   - Restart your development server
   - Check that `.env.local` is in the root directory
   - Verify variable names match exactly

## 📚 Next Steps

1. Set up your database connection
2. Configure additional Firebase services (if needed)
3. Set up monitoring and analytics
4. Deploy to your preferred hosting platform

Your environment is now properly configured and secure! 🎉
