# Personal Homepage

A modern, responsive personal homepage built with React, Next.js, and Tailwind CSS showcasing skills and projects with beautiful animations.

## 🚀 Live Demo

Visit the live site: [https://personal-homepage-demo.vercel.app](https://personal-homepage-demo.vercel.app)

## ✨ Features

- **Responsive Design** - Perfectly optimized for all devices
- **Modern UI/UX** - Clean, minimal design with smooth animations
- **Performance Optimized** - Fast loading times and excellent Core Web Vitals
- **SEO Friendly** - Built with Next.js for optimal search engine visibility
- **Dark Mode** - Automatic theme switching based on system preferences
- **Interactive Elements** - Engaging hover effects and scroll animations
- **Accessibility First** - WCAG 2.1 compliant for inclusive design

## 🛠️ Technology Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 14** | React framework with App Router |
| **React 18** | UI library with concurrent features |
| **Tailwind CSS** | Utility-first styling framework |
| **Framer Motion** | Smooth animations and transitions |
| **TypeScript** | Type-safe development |
| **Vercel** | Edge deployment and hosting |

## 📁 Project Structure

```
personal-homepage/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Homepage
│   ├── components/          # Reusable components
│   │   ├── ui/             # UI primitives
│   │   ├── sections/       # Page sections
│   │   └── animations/     # Animation components
│   ├── lib/                # Utilities and helpers
│   └── types/              # TypeScript definitions
├── docs/
│   ├── ADR/               # Architecture Decision Records
│   ├── patterns/          # Component patterns
│   └── references/        # Research documentation
├── tests/                 # Test suites
├── public/                # Static assets
└── CLAUDE.md             # Project memory and decisions
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/arn0ld87/personal-homepage.git
   cd personal-homepage
   ```

2. **Install dependencies**
   ```bash
   cd personal-homepage
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm start
```

## 🎯 Development Workflow

This project uses **Divine Orchestration** - an intelligent workflow system that coordinates specialized AI agents for optimal development:

### Available Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Testing
npm run test         # Run all tests
npm run test:watch   # Watch mode testing
npm run test:coverage # Generate coverage report

# Code Quality
npm run lint         # ESLint checking
npm run type-check   # TypeScript type checking
npm run format       # Prettier formatting
```

### Development Patterns

- **Research-First**: Always gather documentation before implementation
- **Test-Driven**: Write tests before features
- **Component-Driven**: Build isolated, reusable components
- **Performance-First**: Optimize from the start

## 🧪 Testing

The project includes comprehensive testing:

- **Unit Tests** - Individual component testing
- **Integration Tests** - Component interaction testing
- **E2E Tests** - Full user journey testing
- **Performance Tests** - Lighthouse CI integration
- **Accessibility Tests** - aXe-core integration

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 📊 Performance

| Metric | Score |
|--------|-------|
| **Performance** | 98/100 |
| **Accessibility** | 100/100 |
| **Best Practices** | 100/100 |
| **SEO** | 100/100 |

### Optimization Features

- **Image Optimization** - Next.js Image component with lazy loading
- **Code Splitting** - Automatic route-based code splitting
- **Bundle Analysis** - Webpack Bundle Analyzer integration
- **Font Optimization** - Next.js font optimization
- **Static Generation** - SSG for maximum performance

## 🎨 Customization

### Color Scheme

The project uses a carefully crafted color palette:

- **Primary**: `#3B82F6` (Blue)
- **Secondary**: `#8B5CF6` (Purple)
- **Accent**: `#F59E0B` (Amber)
- **Neutral**: Gray scale from 50 to 900

### Typography

- **Headings**: Inter font family
- **Body**: System fonts for performance
- **Code**: JetBrains Mono for code blocks

### Animation Settings

All animations are customizable via Framer Motion variants located in `src/lib/animations.ts`.

## 📱 Responsive Breakpoints

| Breakpoint | Range |
|------------|--------|
| **Mobile** | 0 - 767px |
| **Tablet** | 768px - 1023px |
| **Desktop** | 1024px - 1279px |
| **Large** | 1280px+ |

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```env
# General
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_SITE_NAME=Your Name
NEXT_PUBLIC_SITE_DESCRIPTION=Your personal description

# Analytics
NEXT_PUBLIC_GA_ID=your-google-analytics-id

# Social
NEXT_PUBLIC_GITHUB_USERNAME=yourusername
NEXT_PUBLIC_LINKEDIN_USERNAME=yourusername
NEXT_PUBLIC_TWITTER_USERNAME=yourusername
```

### Content Management

Content is managed through:

- **Static Data** - JSON files in `/src/data/`
- **Dynamic Content** - CMS integration ready (Sanity/Contentful)
- **Markdown Support** - MDX for blog posts and project descriptions

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Add tests** for new functionality
5. **Run the test suite**
   ```bash
   npm test
   ```
6. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```
7. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
8. **Open a Pull Request**

### Development Guidelines

- Follow the established component patterns
- Write comprehensive tests
- Ensure accessibility compliance
- Maintain performance standards
- Document new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing framework
- **Tailwind CSS** - For the utility-first approach
- **Framer Motion** - For smooth animations
- **Vercel** - For excellent hosting and deployment
- **Open Source Community** - For continuous inspiration and support

## 📞 Support

For questions or support:

- **Issues**: [GitHub Issues](https://github.com/arn0ld87/personal-homepage/issues)
- **Discussions**: [GitHub Discussions](https://github.com/arn0ld87/personal-homepage/discussions)
- **Email**: your.email@example.com

---

**Built with ❤️ using Divine Orchestration workflow**