// src/components/Skills.tsx
import type { FC } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Database, Palette, Smartphone, Server, GitBranch } from 'lucide-react';

/**
 * Skills-Komponente mit animierten Skill-Karten
 */
const Skills: FC = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  const skills = [
    { name: 'Frontend-Entwicklung', icon: Code, color: 'bg-blue-500', description: 'React, TypeScript, Next.js, Vue.js' },
    { name: 'UI/UX Design',         icon: Palette, color: 'bg-purple-500', description: 'Figma, Adobe XD, User Research' },
    { name: 'Backend-Entwicklung',  icon: Server, color: 'bg-green-500', description: 'Node.js, Express, Python, REST APIs' },
    { name: 'Datenbanken',          icon: Database, color: 'bg-yellow-500', description: 'PostgreSQL, MongoDB, Redis' },
    { name: 'Mobile-Entwicklung',   icon: Smartphone, color: 'bg-red-500', description: 'React Native, Flutter, PWA' },
    { name: 'DevOps & Git',         icon: GitBranch, color: 'bg-indigo-500', description: 'Docker, CI/CD, AWS, GitHub Actions' },
  ];

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

  return (
    <section ref={ref} className="py-20 md:py-32 bg-gray-50" id="skills">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Fähigkeiten & Expertise</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Moderne Technologien und Best Practices für erstklassige digitale Lösungen
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skills.map((skill) => {
            const IconComponent = skill.icon;
            return (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className={`w-16 h-16 ${skill.color} rounded-lg flex items-center justify-center mb-4`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{skill.name}</h3>
                <p className="text-gray-600">{skill.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
