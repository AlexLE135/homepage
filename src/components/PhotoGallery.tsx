import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

/**
 * Foto-Galerie Komponente für persönliche Fotografie-Arbeiten
 * Zeigt Fotos in einem eleganten Masonry-Layout mit Hover-Effekten
 */
const PhotoGallery: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const photos = [
    {
      id: 1,
      title: 'Kreative Komposition',
      description: 'Experimentelle Fotografie mit Fokus auf Licht und Schatten',
      image: '/images/87B227C6-789B-4410-A7FC-1DEC0D53AD74_1_105_c.jpeg',
      category: 'Kreativ',
    },
    {
      id: 2,
      title: 'Urban Exploration',
      description: 'Städtische Landschaften und architektonische Details',
      image: '/images/9227A6FF-7B6E-4675-B384-49B9521493DC_1_105_c.jpeg',
      category: 'Urban',
    },
    {
      id: 3,
      title: 'Natur Impressionen',
      description: 'Natürliche Formen und organische Strukturen in der Fotografie',
      image: '/images/D0559586-8972-44A9-8F69-80C492DC98A9_1_105_c.jpeg',
      category: 'Natur',
    },
    {
      id: 4,
      title: 'Abstrakte Kunst',
      description: 'Abstrakte Kompositionen und künstlerische Interpretationen',
      image: '/images/D0F690D2-C1DB-4C79-B6BE-ECC66B5500BB_1_105_c.jpeg',
      category: 'Abstrakt',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  }

  return (
    <section ref={ref} className="py-20 md:py-32 bg-white" id="photography">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Fotografie & Visuelle Kunst
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Eine Auswahl meiner fotografischen Arbeiten und visuellen Erkundungen
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group cursor-pointer"
              style={{ 
                gridRow: index % 2 === 0 ? 'span 2' : 'span 1',
                height: index % 2 === 0 ? '500px' : '300px'
              }}
            >
              <div className="relative h-full rounded-xl overflow-hidden shadow-lg">
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Overlay mit Informationen */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full mb-2">
                      {photo.category}
                    </span>
                    <h3 className="text-white font-semibold text-lg mb-1">
                      {photo.title}
                    </h3>
                    <p className="text-white/80 text-sm">
                      {photo.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA-Sektion */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-gray-600 mb-6">
            Interessiert an weiteren fotografischen Arbeiten?
          </p>
          <button className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            <span>Kontakt aufnehmen</span>
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default PhotoGallery