# LearnWithAI - Adaptive Learning Platform

An AI-powered adaptive learning platform that provides personalized educational experiences using Google AI APIs.

## 🚀 Features

- **Dynamic UI Generation**: AI-generated React components based on learning context
- **Intelligent Learning Roadmaps**: Personalized learning paths with adaptive milestones
- **Adaptive Content Delivery**: Multi-modal content generation with difficulty scaling
- **Gamification**: Clean, minimalistic UI with XP system and achievement badges
- **Real-time Analytics**: Progress tracking and learning effectiveness metrics

## 🏗️ Architecture

### Frontend (Next.js 14 + TypeScript)
- Server-side rendering for optimal SEO
- Dynamic component generation
- Progressive Web App (PWA) capabilities
- Responsive design with Tailwind CSS

### Backend (Node.js + Express + TypeScript)
- RESTful API architecture
- Google AI API integration
- Real-time WebSocket connections
- Microservices-ready design

### Database (PostgreSQL + Prisma)
- User profiles and authentication
- Learning progress tracking
- Content management
- Analytics and metrics

### AI Integration
- Google Gemini Pro for content generation
- Vertex AI for personalization algorithms
- Custom ML models for learning analytics

## 📁 Project Structure

```
learnwithAI/
├── apps/
│   ├── web/                 # Next.js frontend
│   ├── api/                 # Express backend
│   └── mobile/              # React Native (future)
├── packages/
│   ├── ui/                  # Shared UI components
│   ├── database/            # Prisma schema and migrations
│   ├── ai-services/         # Google AI integrations
│   └── shared/              # Shared utilities and types
├── docs/                    # Documentation
└── infrastructure/          # Deployment configs
```

## 🚦 Development Phases

### Phase 1: Core Architecture (Weeks 1-3)
- [x] Project setup and monorepo structure
- [ ] Database schema design
- [ ] Authentication system
- [ ] Basic API endpoints
- [ ] Frontend foundation

### Phase 2: AI Integration (Weeks 4-6)
- [ ] Google AI API integration
- [ ] Content generation system
- [ ] Learning roadmap engine
- [ ] Progress tracking

### Phase 3: Gamification (Weeks 7-9)
- [ ] XP and achievement system
- [ ] UI/UX implementation
- [ ] Social features
- [ ] Mobile optimization

### Phase 4: Analytics & Admin (Weeks 10-12)
- [ ] Analytics dashboard
- [ ] Admin panel
- [ ] Performance optimization
- [ ] Production deployment

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Google Cloud Platform account
- Firebase project

### Installation

```bash
# Clone the repository
git clone https://github.com/NavidJalilian/learnwithAI.git
cd learnwithAI

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Set up database
npm run db:setup

# Start development servers
npm run dev
```

## 📊 Success Metrics

- **Engagement**: DAU/WAU, session duration, completion rates
- **Learning Effectiveness**: Assessment improvements, retention rates
- **Performance**: API response times, content generation speed
- **User Satisfaction**: NPS scores, user feedback ratings

## 🤝 Contributing

Please read our [Contributing Guide](./CONTRIBUTING.md) for details on our code of conduct and development process.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
