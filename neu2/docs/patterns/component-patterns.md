# Component Patterns for Personal Homepage

## React Component Standards

### Functional Components with Hooks
```javascript
// ✅ Preferred: Functional component with hooks
const HeroSection = ({ title, subtitle }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <section className="hero">
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </section>
  );
};
```

### Prop Types and Default Props
```javascript
HeroSection.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

HeroSection.defaultProps = {
  subtitle: 'Welcome to my personal space',
};
```

### CSS Modules Pattern
```css
/* HeroSection.module.css */
.hero {
  @apply min-h-screen flex items-center justify-center;
}

.title {
  @apply text-4xl md:text-6xl font-bold;
}
```

## Atomic Design Structure

### Atoms
- Buttons
- Inputs
- Typography components
- Icons

### Molecules
- Navigation items
- Social media links
- Project cards

### Organisms
- Header
- Footer
- Hero section
- Project showcase

## Responsive Design Patterns

### Mobile-First Approach
```css
/* Mobile first */
.container {
  @apply px-4 py-8;
}

/* Tablet */
@media (min-width: 768px) {
  .container {
    @apply px-6 py-12;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    @apply px-8 py-16;
  }
}
```