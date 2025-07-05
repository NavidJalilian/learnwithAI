# Development Setup Guide

This guide will help you set up the LearnWithAI development environment.

## Prerequisites

- **Node.js** 18+ and npm 9+
- **PostgreSQL** 14+
- **Google Cloud Platform** account
- **Firebase** project

## Quick Start

1. **Clone and Install**
   ```bash
   git clone https://github.com/NavidJalilian/learnwithAI.git
   cd learnwithAI
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

3. **Database Setup**
   ```bash
   # Start PostgreSQL service
   # Create database: learnwithai
   npm run db:setup
   ```

4. **Start Development**
   ```bash
   npm run dev
   ```

## Detailed Configuration

### 1. Google AI Setup

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create an API key
3. Add to `.env.local`:
   ```
   GOOGLE_AI_API_KEY="your_api_key_here"
   ```

### 2. Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable Authentication with Google provider
3. Get your config from Project Settings
4. Add to `.env.local`:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY="your_api_key"
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your_project.firebaseapp.com"
   NEXT_PUBLIC_FIREBASE_PROJECT_ID="your_project_id"
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your_project.appspot.com"
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your_sender_id"
   NEXT_PUBLIC_FIREBASE_APP_ID="your_app_id"
   ```

### 3. Database Configuration

1. Install PostgreSQL locally or use a cloud service
2. Create a database named `learnwithai`
3. Update DATABASE_URL in `.env.local`:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/learnwithai"
   ```

### 4. Google Cloud Platform (Optional)

For advanced AI features:

1. Create a GCP project
2. Enable Vertex AI API
3. Create a service account
4. Download the JSON key file
5. Add to `.env.local`:
   ```
   GOOGLE_CLOUD_PROJECT_ID="your_project_id"
   GOOGLE_APPLICATION_CREDENTIALS="path/to/service-account.json"
   ```

## Development Commands

```bash
# Start all services
npm run dev

# Database operations
npm run db:generate    # Generate Prisma client
npm run db:migrate     # Run migrations
npm run db:studio      # Open Prisma Studio
npm run db:setup       # Initial setup

# Code quality
npm run lint           # Run ESLint
npm run type-check     # TypeScript check
npm run format         # Format code
npm test              # Run tests

# Build
npm run build         # Build all packages
```

## Project Structure

```
learnwithAI/
├── apps/
│   ├── web/              # Next.js frontend
│   │   ├── app/          # App router pages
│   │   ├── components/   # React components
│   │   ├── lib/          # Utilities and hooks
│   │   └── public/       # Static assets
│   └── api/              # Express backend (future)
├── packages/
│   ├── database/         # Prisma schema & client
│   ├── ai-services/      # Google AI integrations
│   ├── ui/               # Shared UI components
│   └── shared/           # Shared utilities
└── docs/                 # Documentation
```

## Development Workflow

### 1. Feature Development

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make changes in the appropriate package
3. Test your changes: `npm test`
4. Commit with conventional commits: `git commit -m "feat: add new feature"`
5. Push and create a PR

### 2. Database Changes

1. Modify `packages/database/schema.prisma`
2. Generate migration: `npm run db:migrate`
3. Test the migration
4. Commit both schema and migration files

### 3. AI Service Development

1. Add new functions to `packages/ai-services/src/`
2. Add proper TypeScript types
3. Test with real API calls
4. Update documentation

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check PostgreSQL is running
   - Verify DATABASE_URL format
   - Ensure database exists

2. **Google AI API Error**
   - Verify API key is correct
   - Check API quotas and billing
   - Ensure proper permissions

3. **Firebase Auth Error**
   - Check Firebase config values
   - Verify domain is authorized
   - Check authentication providers

4. **Build Errors**
   - Clear node_modules: `rm -rf node_modules && npm install`
   - Clear Next.js cache: `rm -rf apps/web/.next`
   - Check TypeScript errors: `npm run type-check`

### Getting Help

- Check the [Issues](https://github.com/NavidJalilian/learnwithAI/issues) page
- Review the [API Documentation](./API.md)
- Check the [Architecture Guide](./ARCHITECTURE.md)

## Next Steps

Once your development environment is set up:

1. Review the [Architecture Documentation](./ARCHITECTURE.md)
2. Check out the [API Documentation](./API.md)
3. Look at the [Component Library](./COMPONENTS.md)
4. Start with the [Tutorial](./TUTORIAL.md)

## Performance Tips

- Use `npm run dev` for development (hot reload)
- Use Prisma Studio for database inspection
- Enable React DevTools and React Query DevTools
- Use Chrome DevTools for performance profiling
