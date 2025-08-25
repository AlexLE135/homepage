import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

/**
 * About-Me Komponente mit animierten Inhalten
 * Präsentiert persönliche Informationen mit eleganten Fade-In Effekten
 */
const About: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

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
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  return (
    <section ref={ref} className="py-20 md:py-32 bg-white" id="about">
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Text-Content */}
          <div className="space-y-6">
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-gray-900"
            >
              Über mich
            </motion.h2>
            
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 leading-relaxed"
            >
              Mein Name ist Alexander Schneider und ich bin ein leidenschaftlicher 
              Fachinformatiker in Ausbildung. Zurzeit absolviere ich meine Umschulung 
              zum Fachinformatiker für Systemintegration am Berufsförderungswerk 
              (BFW) in Leipzig.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 leading-relaxed"
            >
              Meine ganz besondere Leidenschaft gilt der Künstlichen Intelligenz 
              und ihren vielfältigen Anwendungsmöglichkeiten. Ich bin fasziniert 
              davon, wie KI die Welt verändert und neue Wege eröffnet, technische 
              Herausforderungen zu meistern. Diese Begeisterung treibt mich an, 
              kontinuierlich dazuzulernen und innovative Lösungen zu entwickeln.
            </motion.p>

            {/* Skills-Liste */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-4 pt-6"
            >
              {[
                'React & TypeScript',
                'Next.js',
                'Tailwind CSS',
                'Framer Motion',
                'Node.js',
                'UI/UX Design',
              ].map((skill) => (
                <motion.div
                  key={skill}
                  variants={itemVariants}
                  className="flex items-center space-x-2"
                >
                  <div className="w-2 h-2 bg-primary-500 rounded-full" />
                  <span className="text-gray-700 font-medium">{skill}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Visuelle Elemente - Persönliche Fotos */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <div className="aspect-square bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl p-4">
              <div className="grid grid-cols-2 gap-3 h-full">
                {[
                  '/fotos-alex/87B227C6-789B-4410-A7FC-1DEC0D53AD74_1_105_c.jpeg',
                  '/fotos-alex/D0559586-8972-44A9-8F69-80C492DC98A9_1_105_c.jpeg',
                  '/fotos-alex/9227A6FF-7B6E-4675-B384-49B9521493DC_1_105_c.jpeg',
                  '/fotos-alex/4CE2D46A-985E-43E8-8D96-CD332C4661E6_1_105_c.jpeg'
                ].map((photo, i) => (
                  <motion.div
                    key={i}
                    className="relative overflow-hidden rounded-lg bg-white/50 backdrop-blur"
                    animate={{
                      scale: [1, 1.05, 1],
                      rotate: [0, 2, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  >
                    <img
                      src={photo}
                      alt={`Alexander Schneider - Persönliches Foto ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Dekorative Kreise */}
            <motion.div
              className="absolute -top-4 -right-4 w-24 h-24 bg-primary-200 rounded-full blur-2xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary-200 rounded-full blur-2xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.4, 0.6, 0.4],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About