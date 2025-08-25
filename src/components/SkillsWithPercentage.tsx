import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { skillsAPI } from '../services/api';

interface Skill {
  id: number;
  name: string;
  percentage: number;
  category: string;
  icon?: string;
  is_active: boolean;
  sort_order: number;
}

/**
 * Skills-Komponente mit animierten Prozent-Balken
 * Lädt Daten von der Backend-API
 */
const SkillsWithPercentage: React.FC = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const response = await skillsAPI.getSkills();
      setSkills(response.data);
    } catch (err) {
      console.error('Error fetching skills:', err);
      // Fallback data
      setSkills([
        { id: 1, name: 'React', percentage: 85, category: 'Frontend', is_active: true, sort_order: 0 },
        { id: 2, name: 'TypeScript', percentage: 78, category: 'Frontend', is_active: true, sort_order: 1 },
        { id: 3, name: 'Node.js', percentage: 72, category: 'Backend', is_active: true, sort_order: 2 },
        { id: 4, name: 'PostgreSQL', percentage: 68, category: 'Database', is_active: true, sort_order: 3 },
        { id: 5, name: 'Tailwind CSS', percentage: 82, category: 'Frontend', is_active: true, sort_order: 4 },
        { id: 6, name: 'Docker', percentage: 65, category: 'DevOps', is_active: true, sort_order: 5 }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

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
  };

  const progressVariants = {
    hidden: { width: 0 },
    visible: (percentage: number) => ({
      width: `${percentage}%`,
      transition: {
        duration: 1.5,
        ease: "easeOut",
        delay: 0.3,
      },
    }),
  };

  if (loading) {
    return (
      <section className="py-20 md:py-32 bg-gray-50" id="skills">
        <div className="container-custom">
          <div className="text-center">
            <div className="animate-pulse bg-gray-300 h-12 w-64 mx-auto mb-6 rounded"></div>
            <div className="animate-pulse bg-gray-300 h-6 w-96 mx-auto rounded"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="py-20 md:py-32 bg-gray-50" id="skills">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Fähigkeiten & Expertise
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meine technischen Fähigkeiten mit detaillierten Prozentangaben
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto space-y-8"
        >
          {skills.map((skill) => (
            <motion.div
              key={skill.id}
              variants={itemVariants}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-gray-900">{skill.name}</h3>
                <span className="text-sm font-medium text-primary-600">
                  {skill.percentage}%
                </span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <motion.div
                  custom={skill.percentage}
                  variants={progressVariants}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
                  style={{ originX: 0 }}
                />
              </div>

              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-500">{skill.category}</span>
                <div className="flex space-x-2">
                  <span className="text-xs px-2 py-1 bg-primary-100 text-primary-700 rounded-full">
                    Editierbar
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-gray-600 mb-4">
            Diese Werte können im Admin-Bereich live angepasst werden
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsWithPercentage;