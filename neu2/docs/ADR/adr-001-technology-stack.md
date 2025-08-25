# ADR-001: Technology Stack Selection

## Status
**Status:** Accepted  
**Date:** 2025-08-22  
**Deciders:** Project Owner

## Context
We need to choose the technology stack for building a modern, performant personal homepage that showcases skills and projects effectively.

## Decision
We will use:
- **Frontend Framework:** Next.js 14 with App Router
- **Styling:** Tailwind CSS for utility-first styling
- **Deployment:** Vercel for optimal Next.js hosting
- **Testing:** Jest + React Testing Library
- **Icons:** Heroicons + Lucide React
- **Animations:** Framer Motion for smooth interactions

## Rationale
- **Next.js:** Provides excellent performance, SEO, and developer experience
- **Tailwind CSS:** Rapid prototyping with consistent design system
- **Vercel:** Zero-config deployment with edge functions support
- **Jest:** Industry standard for React testing
- **Heroicons:** Consistent icon set for modern UIs

## Consequences
- **Positive:** Fast development, excellent performance, great SEO
- **Negative:** Learning curve for Next.js App Router
- **Neutral:** Requires Node.js environment for development

## Implementation
1. Initialize Next.js project with Tailwind
2. Set up testing framework
3. Configure deployment pipeline
4. Create component library
5. Build homepage sections