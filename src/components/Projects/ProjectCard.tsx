import { useState } from 'react';
import type { Project } from '../../content';
import { useLanguage } from '../../context/LanguageContext';
import { asset } from '../../utils';
import { ExternalIcon, FlipIcon, GitHubIcon } from '../ui/icons';
import { ImageWithFallback } from '../ui/ImageWithFallback';
import btn from '../ui/Button.module.css';
import styles from './ProjectCard.module.css';

function Corners({ number }: { number: string }) {
  return (
    <>
      {(['top', 'bottom'] as const).map((pos) => (
        <span key={pos} className={`${styles.corner} ${styles[pos]}`} aria-hidden="true">
          <span className={styles.rank}>{number}</span>
          <span className={styles.suit}>♥</span>
        </span>
      ))}
    </>
  );
}

interface Props {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: Props) {
  const { t, tr } = useLanguage();
  const [flipped, setFlipped] = useState(false);
  const number = String(index + 1).padStart(2, '0');
  const title = tr(project.title);
  const titleId = `project-${project.id}-title`;

  // Touch screens have no hover, so a tap on the card flips it.
  // Mouse users get the hover flip from CSS; everyone has the flip button.
  const onCardClick = () => {
    if (window.matchMedia('(hover: none)').matches) setFlipped((f) => !f);
  };

  return (
    <article className={styles.card} data-flipped={flipped} aria-labelledby={titleId}>
      <div className={styles.scene} onClick={onCardClick}>
        <div className={styles.inner}>
          {/* ---------- Front ---------- */}
          <div className={`${styles.face} ${styles.front}`}>
            <Corners number={number} />
            <ImageWithFallback
              className={styles.image}
              src={asset(project.image)}
              alt={t.projects.imageAlt(title)}
              fallback={
                <div className={styles.placeholder} aria-hidden="true">
                  <span className={styles.placeholderSuit}>♥</span>
                  <span className={styles.placeholderTitle}>{title}</span>
                </div>
              }
            />
            <div className={styles.body}>
              {project.label && <p className={styles.label}>{tr(project.label)}</p>}
              <h3 id={titleId} className={styles.title}>
                {title}
              </h3>
              <p className={styles.summary}>{tr(project.summary)}</p>
            </div>
          </div>

          {/* ---------- Back: tech stack ---------- */}
          <div className={`${styles.face} ${styles.back}`}>
            <Corners number={number} />
            <div className={styles.backBody}>
              <h4 className={styles.backTitle}>{t.projects.techTitle}</h4>
              <ul className={styles.tags}>
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              {project.details && <p className={styles.details}>{tr(project.details)}</p>}
            </div>
            <span className={styles.watermark} aria-hidden="true">
              ♥
            </span>
          </div>
        </div>
      </div>

      {/* Links live outside the flipping card, so they always work. */}
      <div className={styles.actions}>
        <button
          type="button"
          className={`${btn.btn} ${btn.small} ${styles.flipButton}`}
          onClick={() => setFlipped((f) => !f)}
        >
          <FlipIcon size={16} />
          {flipped ? t.projects.showFront : t.projects.showBack}
          <span className="sr-only">{t.projects.linkSuffix(title)}</span>
        </button>
        {project.github && (
          <a
            href={project.github}
            className={`${btn.btn} ${btn.small} ${btn.secondary}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon size={16} />
            {t.projects.github}
            <span className="sr-only">
              {t.projects.linkSuffix(title)} {t.newTab}
            </span>
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            className={`${btn.btn} ${btn.small} ${btn.primary}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalIcon size={16} />
            {t.projects.demo}
            <span className="sr-only">
              {t.projects.linkSuffix(title)} {t.newTab}
            </span>
          </a>
        )}
      </div>
    </article>
  );
}
