import { projects } from '../../content';
import { useLanguage } from '../../context/LanguageContext';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { ProjectCard } from './ProjectCard';
import styles from './Projects.module.css';

export function Projects() {
  const { t } = useLanguage();

  return (
    <section id="projects" className={styles.section} aria-labelledby="projects-title">
      <div className="container">
        <SectionHeading
          id="projects-title"
          suit="♥"
          eyebrow={t.projects.eyebrow}
          title={t.projects.title}
          intro={t.projects.intro}
        />
        <ul className={styles.grid}>
          {projects.map((project, i) => (
            <Reveal as="li" key={project.id} delay={(i % 2) * 120}>
              <ProjectCard project={project} index={i} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
