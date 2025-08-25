# Personal Homepage - Divine Orchestration Configuration

## 🎯 Project Overview

**Project Type**: Personal portfolio website showcasing professional skills and projects
**Tech Stack**: React 18 + TypeScript + Vite + Vitest + Tailwind CSS
**Purpose**: Professional portfolio for job applications and client acquisition
**Target Audience**: Recruiters, potential clients, fellow developers

## 🔧 Technology Stack Details

### Core Technologies
- **React 18**: Modern React with hooks, concurrent features, and strict mode
- **TypeScript 5.x**: Strict type checking, advanced type patterns
- **Vite 5.x**: Fast build tool with HMR and optimized production builds
- **Vitest**: Modern testing framework with Vite integration
- **Tailwind CSS 3.x**: Utility-first CSS with custom design system

### Key Features
- **Responsive Design**: Mobile-first approach with custom breakpoints
- **Dark Mode**: System preference detection with manual toggle
- **Performance Optimized**: Code splitting, lazy loading, image optimization
- **SEO Ready**: Meta tags, structured data, sitemap generation
- **Accessibility**: WCAG 2.1 AA compliance, keyboard navigation
- **Testing**: Comprehensive test coverage with Vitest + React Testing Library

## 📁 Project Structure

```
personal-homepage/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── common/         # Generic components (Button, Card, etc.)
│   │   ├── portfolio/      # Portfolio-specific components
│   │   └── layout/         # Layout components (Header, Footer, etc.)
│   ├── hooks/              # Custom React hooks
│   ├── data/               # Static data (projects, skills, experience)
│   ├── content/            # Markdown content for projects/blogs
│   ├── utils/              # Utility functions and helpers
│   ├── styles/             # Global styles and Tailwind configuration
│   └── test/               # Test utilities and mocks
├── public/                 # Static assets and images
├── tests/                  # Test files
├── .claude/agents/         # Project-specific AI agents
└── docs/                   # Documentation and ADRs
```

## 🤖 Available Agents

### 1. **react-typescript**
- **Purpose**: React component development and TypeScript patterns
- **Focus**: Functional components, hooks, state management, props interfaces
- **Use**: "Create a new project card component with TypeScript"

### 2. **vite-build**
- **Purpose**: Build optimization and deployment configuration
- **Focus**: Vite configuration, performance optimization, deployment strategies
- **Use**: "Optimize the build for GitHub Pages deployment"

### 3. **vitest-testing**
- **Purpose**: Test creation and coverage optimization
- **Focus**: Unit tests, component testing, integration tests, coverage reports
- **Use**: "Write tests for the contact form component"

### 4. **tailwind-styling**
- **Purpose**: CSS styling and responsive design
- **Focus**: Tailwind utility classes, responsive patterns, dark mode, animations
- **Use**: "Style the hero section with responsive design and dark mode support"

### 5. **portfolio-content**
- **Purpose**: Content management and SEO optimization
- **Focus**: Project data structure, SEO meta tags, personal branding content
- **Use**: "Add a new project with SEO-optimized content"

## 🚀 Common Workflows

### Adding a New Project
```bash
# Automatic orchestration will:
1. portfolio-content → Create project data structure and content
2. react-typescript → Build project component with TypeScript
3. tailwind-styling → Style project card and detail view
4. vitest-testing → Write component tests
5. vite-build → Optimize for deployment
```

### Performance Optimization
```bash
# System will:
1. vite-build → Analyze bundle size and implement code splitting
2. tailwind-styling → Optimize CSS purge and responsive images
3. vitest-testing → Add performance tests
4. portfolio-content → Optimize images and implement lazy loading
```

### SEO Enhancement
```bash
# Workflow includes:
1. portfolio-content → Generate sitemap and meta tags
2. react-typescript → Implement structured data components
3. vite-build → Configure prerendering for SEO
4. vitest-testing → Test SEO-related functionality
```

## 📊 Content Guidelines

### Project Data Standards
- **Project IDs**: kebab-case (e.g., "ecommerce-platform")
- **Technology Tags**: Consistent naming (React, not react.js)
- **Descriptions**: 150-200 characters for cards, 300-500 for details
- **Images**: Optimized WebP format, multiple sizes for responsive loading
- **Dates**: ISO format (YYYY-MM-DD)

### Personal Branding
- **Professional Tone**: Confident but approachable
- **Technical Depth**: Balance technical detail with accessibility
- **Achievement Focus**: Quantify impact where possible
- **Current Technologies**: Prioritize modern, in-demand skills

## 🎯 Quality Standards

### Code Quality
- **TypeScript**: Strict mode enabled, no `any` types
- **Testing**: 80%+ coverage for new features
- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: Lighthouse score > 90
- **Security**: No sensitive data in client-side code

### Design Standards
- **Consistency**: Unified color scheme and typography
- **Responsiveness**: Mobile-first, works on all devices
- **Dark Mode**: Complete theme support with smooth transitions
- **Performance**: Optimized images, minimal bundle size

## 🔍 Development Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Testing
npm run test         # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
npm run test:ui      # UI for test debugging

# Code Quality
npm run lint         # ESLint checking
npm run type-check   # TypeScript type checking
npm run format       # Prettier formatting
```

## 🌟 Next Steps

### Immediate Priorities
1. **Content Audit**: Review and update all project data
2. **Performance**: Implement image optimization and lazy loading
3. **Testing**: Achieve 80%+ test coverage across components
4. **SEO**: Add comprehensive meta tags and structured data

### Future Enhancements
- **Blog Section**: Technical articles and project retrospectives
- **Contact Form**: Functional form with email integration
- **Analytics**: Privacy-focused analytics integration
- **Internationalization**: Multi-language support

## 📞 Support and Resources

### Documentation
- **Component Docs**: Storybook setup for component documentation
- **API Reference**: TypeScript definitions and usage examples
- **Deployment Guide**: Step-by-step deployment instructions

### Content Management
- **Image Optimization**: Automated image processing pipeline
- **Content Updates**: Easy project addition workflow
- **SEO Monitoring**: Automated SEO health checks

---

**This configuration enables the divine orchestration system for your personal homepage project. Each agent specializes in a specific aspect of development, ensuring high-quality, maintainable code that follows modern best practices.**