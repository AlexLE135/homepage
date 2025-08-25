import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Hero from '../../src/components/Hero'

/**
 * Tests für die Hero-Komponente
 * Überprüft Rendering, Accessibility und Animationen
 */
describe('Hero Component', () => {
  it('rendert die Hauptüberschrift korrekt', () => {
    render(<Hero />)
    
    const heading = screen.getByText(/Willkommen auf meiner/i)
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveClass('text-5xl', 'md:text-7xl', 'font-bold')
  })

  it('zeigt Call-to-Action Buttons', () => {
    render(<Hero />)
    
    const mehrErfahrenButton = screen.getByText('Mehr erfahren')
    const kontaktButton = screen.getByText('Kontakt aufnehmen')
    
    expect(mehrErfahrenButton).toBeInTheDocument()
    expect(kontaktButton).toBeInTheDocument()
  })

  it('hat korrekte Links zu den Sektionen', () => {
    render(<Hero />)
    
    const mehrLink = screen.getByText('Mehr erfahren').closest('a')
    const kontaktLink = screen.getByText('Kontakt aufnehmen').closest('a')
    
    expect(mehrLink).toHaveAttribute('href', '#about')
    expect(kontaktLink).toHaveAttribute('href', '#contact')
  })

  it('ist für Screenreader zugänglich', () => {
    render(<Hero />)
    
    // Überprüfe semantic HTML-Struktur
    const section = screen.getByRole('region')
    expect(section).toBeInTheDocument()
  })

  it('rendert visuelle Dekorationselemente', () => {
    render(<Hero />)
    
    // Fliegende Elemente sollten vorhanden sein
    const floatingElements = document.querySelectorAll('.absolute')
    expect(floatingElements.length).toBeGreaterThan(0)
  })
})