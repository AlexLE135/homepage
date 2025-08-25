import Hero from './components/Hero'
import About from './components/About'
import SkillsWithPercentage from './components/SkillsWithPercentage'
import Portfolio from './components/Portfolio'
import PhotoGallery from './components/PhotoGallery'
import Contact from './components/Contact'
import Navigation from './components/Navigation'
import Footer from './components/Footer'

/**
 * Haupt-App-Komponente
 * Verwaltet die Gesamtstruktur der Homepage mit allen Sektionen
 */
function App() {
  return (
    <div className="App">
      <Navigation />
      <Hero />
      <About />
      <SkillsWithPercentage />
      <Portfolio />
      <PhotoGallery />
      <Contact />
      <Footer />
    </div>
  )
}

export default App