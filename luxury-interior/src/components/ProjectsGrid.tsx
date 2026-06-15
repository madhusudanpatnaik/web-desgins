import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: 'VILLA NOVA',
    location: 'Monaco, French Riviera',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    title: 'THE OBSIDIAN',
    location: 'Bel Air, Los Angeles',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    title: 'AZURE PENTHOUSE',
    location: 'Dubai Marina, UAE',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    title: 'CASA BLANCO',
    location: 'Ibiza, Spain',
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=800&q=80'
  }
];

export function ProjectsGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="section projects-section" id="projects" ref={ref}>
      <motion.div 
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="section-title">Our <span>Portfolio</span></h2>
      </motion.div>

      <motion.div 
        className="projects-grid"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {projects.map((project) => (
          <motion.div key={project.id} className="project-card" variants={itemVariants}>
            <div className="project-image-container">
              <img src={project.image} alt={project.title} className="project-image" loading="lazy" />
              <div className="project-overlay">
                <h3>{project.title}</h3>
                <p>{project.location}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
