import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Github, Eye } from 'lucide-react'

/**
 * Portfolio-Komponente mit animierten Projekt-Karten
 * Zeigt Projekte in einem responsiven Grid mit Hover-Effekten
 */
const Portfolio: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Moderne Online-Shop Plattform mit React und Next.js, komplette Bestellabwicklung und Zahlungsintegration.',
      image: '/images/project-1.jpg',
      tags: ['React', 'Next.js', 'Stripe', 'PostgreSQL'],
      github: 'https://github.com/arn0ld87/ecommerce',
      demo: 'https://demo-shop.vercel.app',
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Kollaborative Aufgabenverwaltung mit Echtzeit-Updates, Drag-and-Drop und Team-Funktionen.',
      image: '/images/project-2.jpg',
      tags: ['React', 'TypeScript', 'Socket.io', 'MongoDB'],
      github: 'https://github.com/arn0ld87/taskmanager',
      demo: 'https://task-app-demo.netlify.app',
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'Interaktives Wetter-Dashboard mit Live-Daten, Vorhersagen und personalisierbaren Widgets.',
      image: '/images/project-3.jpg',
      tags: ['React', 'API Integration', 'Charts', 'Tailwind'],
      github: 'https://github.com/arn0ld87/weather-dashboard',
      demo: 'https://weather-dashboard-demo.netlify.app',
    },
    {
      id: 4,
      title: 'Portfolio Website',
      description: 'Responsive Portfolio-Seite mit modernen Animationen und optimierter Performance.',
      image: '/images/project-4.jpg',
      tags: ['React', 'Framer Motion', 'Tailwind CSS', 'Responsive'],
      github: 'https://github.com/arn0ld87/portfolio',
      demo: 'https://portfolio-demo.vercel.app',
    },
    {
      id: 5,
      title: 'Social Media Dashboard',
      description: 'Analytics-Dashboard für Social Media mit detaillierten Einblicken und Berichten.',
      image: '/images/project-5.jpg',
      tags: ['Vue.js', 'Chart.js', 'API', 'Tailwind'],
      github: 'https://github.com/arn0ld87/social-dashboard',
      demo: 'https://social-demo.netlify.app',
    },
    {
      id: 6,
      title: 'AI Content Generator',
      description: 'KI-gestützter Content-Generator mit GPT-Integration und benutzerfreundlicher Oberfläche.',
      image: '/images/project-6.jpg',
      tags: ['React', 'OpenAI API', 'Node.js', 'Express'],
      github: 'https://github.com/arn0ld87/ai-content',
      demo: 'https://ai-demo.vercel.app',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <section ref={ref} className="py-20 md:py-32 bg-gray-50" id="portfolio">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Projekte & Arbeiten
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Eine Auswahl meiner letzten Projekte mit modernen Technologien und innovativen Lösungen
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden group"
            >
              {/* Projekt-Bild */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Hover-Overlay mit Links */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex space-x-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/90 rounded-full hover:bg-white transition-colors"
                    >
                      <Github className="w-5 h-5 text-gray-700" />
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/90 rounded-full hover:bg-white transition-colors"
                    >
                      <Eye className="w-5 h-5 text-gray-700" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Projekt-Details */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{project.description}</p>
                
                {/* Technologie-Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action-Buttons */}
                <div className="flex space-x-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-sm text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>Code ansehen</span>
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-sm text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA-Sektion */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-gray-600 mb-6">
            Interessiert an mehr Projekten?
          </p>
          <a
            href="https://github.com/arn0ld87"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Github className="w-5 h-5" />
            <span>Alle Projekte auf GitHub ansehen</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Portfolio