# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Personal Portfolio Website** - Modern React/TypeScript application with CMS backend
- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS + Framer Motion
- **Backend**: Node.js + Express + SQLite + JWT authentication
- **Testing**: Vitest + Testing Library
- **Build**: Vite with code splitting

## Development Commands

### Frontend (Root Directory)
```bash
npm run dev          # Start development server (port 3000)
npm run build        # Build for production
npm run preview      # Preview production build
npm run test         # Run tests
npm run test:ui      # Run tests with UI
npm run test:coverage # Run tests with coverage
npm run lint         # Run ESLint
npm run typecheck    # TypeScript type checking
```

### Backend (backend/ Directory)
```bash
cd backend
npm run dev          # Start backend with nodemon
npm start           # Start backend normally
```

## Architecture

### Frontend Structure
```
src/
├── components/     # React components (Hero, Portfolio, Skills, etc.)
├── pages/         # Page components
├── services/      # API service layer
├── hooks/         # Custom React hooks
├── styles/        # CSS and Tailwind config
├── utils/         # Utility functions
└── data/          # Static content data
```

### Backend Structure
```
backend/
├── src/
│   ├── controllers/  # Business logic
│   ├── middleware/   # Auth and other middleware
│   ├── models/       # Data models
│   ├── routes/       # API routes (auth, content, projects, etc.)
│   └── utils/        # Database and utility functions
├── uploads/          # File uploads directory
└── data/             # SQLite database
```

## Key Features

- **Parallax scrolling animations** with Framer Motion
- **Responsive design** with Tailwind CSS
- **Admin panel** for content management
- **Image upload** functionality
- **JWT authentication** for admin access
- **Contact form** integration
- **SEO optimized** with proper meta tags

## Development Patterns

- Use path alias `@/*` for imports from `src/*`
- Components follow PascalCase naming
- TypeScript strict mode enabled
- ESLint with React/TypeScript rules
- Tests use Vitest and Testing Library

## Environment Variables

Frontend (.env.local):
```
VITE_API_BASE_URL=http://localhost:3001
VITE_FORMSPREE_ID=your-formspree-id
```

Backend (.env):
```
JWT_SECRET=your-jwt-secret
PORT=3001
NODE_ENV=development
```

## Deployment

**Frontend**: Built with Vite, deploy to Vercel/Netlify
**Backend**: Node.js application, deploy to Railway/DigitalOcean

## Testing

- Unit tests in `tests/` directory
- Component tests with Testing Library
- Coverage reporting with Vitest
- Test setup in `tests/setup.ts`

Run specific test: `npm test -- src/components/Hero.test.tsx`