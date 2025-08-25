# Component Patterns & Conventions

## Component Structure
Each component follows this pattern:

```typescript
import React from 'react'
import { motion } from 'framer-motion'

interface ComponentProps {
  // Props interface
}

const ComponentName: React.FC<ComponentProps> = ({ props }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Component content */}
    </motion.section>
  )
}

export default ComponentName
```

## Naming Conventions
- **Components**: PascalCase (e.g., `Hero`, `About`, `Portfolio`)
- **Props**: CamelCase with descriptive names
- **Files**: ComponentName.tsx for main components
- **Styles**: Tailwind classes inline, custom classes in CSS modules when needed

## Animation Patterns
- All sections use `motion` from Framer Motion
- Entrance animations: fade in from bottom
- Hover effects: subtle scale or translate transformations
- Scroll-triggered animations using `useInView` hook

## Responsive Design
- Mobile-first approach
- Breakpoints: `sm`, `md`, `lg`, `xl`
- Grid layouts for complex content
- Flexible spacing using Tailwind spacing scale

## Color Scheme
- Primary: `primary-600` (purple)
- Secondary: `secondary-700` (blue)
- Accent: `accent-500` (pink)
- Text: `gray-900` (dark), `gray-600` (medium), `gray-400` (light)
- Background: `white`, `gray-50` (light), `gray-900` (dark)