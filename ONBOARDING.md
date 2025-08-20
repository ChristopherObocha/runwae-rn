# Runwae Engineering Onboarding Guide

## Welcome to Runwae! 🚀

Welcome aboard! You're joining as a founding software engineer focused on cloud architecture and backend development. This document will help you get up to speed with our tech stack, architecture decisions, and development workflow.

## 🏗️ Project Overview

**Runwae** is a React Native travel application that helps users plan, organize, and share their trips. We're building a comprehensive travel companion that integrates with travel APIs, provides real-time collaboration, and offers a seamless mobile experience.

### Key Features

- Trip planning and itinerary management
- Real-time collaboration between travelers
- Integration with travel APIs (Amadeus)
- Social features for sharing trips
- Cross-platform mobile app (iOS/Android)

## 🛠️ Tech Stack

### Frontend (Mobile App)

- **Framework**: React Native with Expo SDK 52
- **Language**: TypeScript
- **Navigation**: Expo Router v4
- **State Management**: Zustand + TinyBase
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **UI Components**: React Native Elements, React Native Primitives
- **Authentication**: Clerk
- **Database**: Supabase (PostgreSQL)
- **Payment Processing**: Stripe

### Backend & Infrastructure

- **Runtime**: Cloudflare Workers
- **Language**: TypeScript
- **Database**: Cloudflare D1 (SQLite) + Supabase (PostgreSQL)
- **Real-time**: WebSockets via TinyBase synchronization
- **Deployment**: Cloudflare Workers with Wrangler
- **API Integration**: Amadeus Travel API

### Development Tools

- **Package Manager**: Bun (primary), npm (fallback)
- **Linting**: ESLint with Universe config
- **Formatting**: Prettier
- **Build System**: EAS Build (Expo)
- **Version Control**: Git

## 🏛️ Architecture Overview

### System Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   React Native  │    │  Cloudflare      │    │     Supabase    │
│      Client     │◄──►│     Workers      │◄──►│   (PostgreSQL)  │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         │                       ▼                       ▼
         ▼                       ▼                       ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   TinyBase      │    │   Durable        │    │   Clerk Auth    │
│  Local Store    │    │   Objects       │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### Key Architectural Decisions

1. **Edge Computing**: Using Cloudflare Workers for global performance and scalability
2. **Real-time Sync**: TinyBase for offline-first data with real-time synchronization
3. **Hybrid Database**: Supabase for user data, Cloudflare D1 for real-time features
4. **Mobile-First**: React Native with Expo for cross-platform development
5. **Type Safety**: Full TypeScript implementation across the stack

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Git
- Expo CLI: `npm install -g @expo/cli`
- Wrangler CLI: `npm install -g wrangler`
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Environment Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Runwae
   ```

2. **Install dependencies**

   ```bash
   # Install mobile app dependencies
   cd runwae-rn
   bun install

   # Install server dependencies
   cd ../server
   bun install
   ```

3. **Environment Variables**

   Create `.env` files in both `runwae-rn/` and `server/` directories:

   **Mobile App (.env)**

   ```bash
   EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   EXPO_PUBLIC_AMADEUS_CLIENT_ID=your_amadeus_client_id
   EXPO_PUBLIC_AMADEUS_CLIENT_SECRET=your_amadeus_client_secret
   ```

   **Server (.env)**

   ```bash
   # Add any server-specific environment variables
   ```

4. **Cloudflare Setup**

   ```bash
   cd server
   wrangler login
   wrangler dev
   ```

5. **Mobile App Development**
   ```bash
   cd runwae-rn
   bun start
   ```

## 📱 Mobile App Development

### Project Structure

```
runwae-rn/
├── app/                    # Expo Router app directory
│   ├── (auth)/            # Authentication routes
│   ├── (onboarding)/      # Onboarding flow
│   ├── (tabs)/            # Main app tabs
│   └── trip/              # Trip-related screens
├── components/             # Reusable UI components
├── hooks/                  # Custom React hooks
├── stores/                 # Zustand state stores
├── services/               # API services (Amadeus, etc.)
├── utils/                  # Utility functions
└── types/                  # TypeScript type definitions
```

### Key Development Commands

```bash
# Start development server
bun start

# Run on iOS simulator
bun ios

# Run on Android emulator
bun android

# Build for development
bun build:dev

# Build for production
bun build:prod

# Lint and format code
bun lint
bun format
```

### State Management

- **Zustand**: Global app state (auth, user preferences)
- **TinyBase**: Local data storage with real-time sync
- **Context**: Component-specific state (forms, modals)

## ☁️ Backend Development

### Project Structure

```
server/
├── src/
│   └── index.ts           # Main worker entry point
├── wrangler.jsonc         # Cloudflare Workers configuration
└── package.json           # Dependencies and scripts
```

### Key Development Commands

```bash
# Start development server
bun dev

# Deploy to Cloudflare
bun deploy

# Generate TypeScript types
bun cf-typegen
```

### Cloudflare Workers Architecture

- **Durable Objects**: For real-time WebSocket connections
- **TinyBase Integration**: Real-time data synchronization
- **Edge Computing**: Global deployment for low latency

## 🔐 Authentication & Security

### Authentication Flow

1. **Clerk**: Handles user authentication and session management
2. **Supabase**: Stores user data and handles database permissions
3. **Secure Storage**: Sensitive data stored in device secure storage

### Security Considerations

- API keys stored in environment variables
- Secure token storage using Expo SecureStore
- HTTPS-only communication
- Input validation and sanitization

## 🗄️ Database Design

### Supabase (PostgreSQL)

- User profiles and authentication
- Trip data and itineraries
- Social features and sharing
- File storage and media

### Cloudflare D1 (SQLite)

- Real-time collaboration data
- WebSocket connection management
- Temporary session data

## 🔌 API Integrations

### Amadeus Travel API

- Flight search and booking
- Hotel information
- Travel recommendations
- Token-based authentication with automatic refresh

### Integration Patterns

- Service classes for API abstraction
- Token management and caching
- Error handling and retry logic
- Rate limiting considerations

## 🚀 Deployment & DevOps

### Mobile App Deployment

- **EAS Build**: Expo Application Services for app builds
- **App Store**: iOS App Store and Google Play Store
- **OTA Updates**: Expo Updates for instant app updates

### Backend Deployment

- **Cloudflare Workers**: Automatic global deployment
- **Wrangler**: CLI tool for deployment and management
- **Environment Management**: Separate configs for dev/staging/prod

## 🧪 Testing Strategy

### Current Testing

- Unit tests for utility functions
- Component testing with React Native Testing Library
- Snapshot testing for UI components

### Testing Recommendations

- API integration tests
- End-to-end testing with Detox
- Performance testing for real-time features
- Security testing for authentication flows

## 📊 Monitoring & Observability

### Current Setup

- Cloudflare Workers observability enabled
- Console logging for debugging
- Error tracking in development

### Monitoring Recommendations

- Application performance monitoring (APM)
- Error tracking and alerting
- Real-time metrics dashboard
- User analytics and crash reporting

## 🔄 Development Workflow

### Git Workflow

1. **Feature Branches**: Create feature branches from `main`
2. **Pull Requests**: Submit PRs for code review
3. **Testing**: Ensure all tests pass before merging
4. **Deployment**: Deploy to staging before production

### Code Quality

- **ESLint**: Code linting with Universe config
- **Prettier**: Code formatting
- **TypeScript**: Strict type checking
- **Code Review**: All changes require review

## 📚 Learning Resources

### Essential Reading

- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Expo SDK Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [TinyBase Documentation](https://tinybase.org/)
- [Supabase Documentation](https://supabase.com/docs)

### Key Concepts to Master

- Edge computing and serverless architecture
- Real-time data synchronization
- Mobile app development lifecycle
- API design and integration
- Database design and optimization

## 🎯 First Week Goals

### Day 1-2: Environment Setup

- [ ] Complete development environment setup
- [ ] Run the mobile app locally
- [ ] Deploy a test worker to Cloudflare
- [ ] Review the codebase structure

### Day 3-4: Understanding the System

- [ ] Study the authentication flow
- [ ] Understand the real-time sync architecture
- [ ] Review API integrations
- [ ] Set up monitoring and logging

### Day 5: First Contribution

- [ ] Pick a small bug or feature to work on
- [ ] Submit your first pull request
- [ ] Deploy a change to staging

## 🆘 Getting Help

### Team Communication

- **Slack/Discord**: Primary communication channel
- **GitHub Issues**: Bug reports and feature requests
- **Code Reviews**: Ask questions during PR reviews
- **Documentation**: Keep this guide updated as you learn

### Escalation Path

1. Check existing documentation
2. Search GitHub issues and discussions
3. Ask in team chat
4. Schedule a 1:1 with team lead
5. Escalate to engineering manager

## 🔮 Future Roadmap

### Short Term (1-3 months)

- Improve monitoring and observability
- Enhance error handling and logging
- Optimize database queries and performance
- Implement comprehensive testing

### Medium Term (3-6 months)

- Scale infrastructure for growth
- Implement advanced caching strategies
- Add performance monitoring
- Enhance security measures

### Long Term (6+ months)

- Multi-region deployment
- Advanced analytics and insights
- Machine learning integration
- Platform expansion

## 📝 Notes & Updates

Use this section to add your own notes, discoveries, and updates as you learn:

---

**Welcome to the team! We're excited to have you on board. This is a living document - feel free to suggest improvements and additions as you become more familiar with the system.**

**Remember: There are no stupid questions. We're all learning and growing together. 🚀**
