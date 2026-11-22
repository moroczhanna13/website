import { site } from '../../content';
import { useLanguage } from '../../context/LanguageContext';
import { useFileExists } from '../../hooks/useFileExists';
import { asset } from '../../utils';
import { CodeWindow } from '../CodeWindow/CodeWindow';
import { ArrowDownIcon, DownloadIcon, GitHubIcon } from '../ui/icons';
import btn from '../ui/Button.module.css';
import styles from './Hero.module.css';

export function Hero() {
  const { t, tr } = useLanguage();
  const cvUrl = asset(site.cvFile);
  const hasCv = useFileExists(cvUrl, 'pdf');

  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.decor} aria-hidden="true">
        <span>♥</span>
        <span>♦</span>
        <span>♠</span>
        <span>♣</span>
      </div>

      <div className={`container ${styles.grid}`}>
        <div className={styles.text}>
          <p className={`${styles.greeting} ${styles.enter}`}>{t.hero.greeting}</p>
          <h1 id="hero-title" className={`${styles.name} ${styles.enter}`}>
            {tr(site.name)}
          </h1>
          <p className={`${styles.subtitle} ${styles.enter}`}>
            <span className={styles.heart} aria-hidden="true">
              ♥
            </span>
            {t.hero.subtitle}
          </p>
          <p className={`${styles.intro} ${styles.enter}`}>{t.hero.intro}</p>

          <div className={`${styles.actions} ${styles.enter}`}>
            <a href="#projects" className={`${btn.btn} ${btn.primary}`}>
              {t.hero.ctaProjects}
              <ArrowDownIcon size={18} />
            </a>
            <a href={site.github} className={`${btn.btn} ${btn.secondary}`} target="_blank" rel="noopener noreferrer">
              <GitHubIcon size={18} />
              {t.hero.ctaGithub}
              <span className="sr-only">{t.newTab}</span>
            </a>
            {hasCv && (
              <a href={cvUrl} download={site.cvDownloadName} className={`${btn.btn} ${btn.secondary}`}>
                <DownloadIcon size={18} />
                {t.hero.ctaCv}
                <span className="sr-only">(PDF)</span>
              </a>
            )}
          </div>
        </div>

        <div className={`${styles.editor} ${styles.enter}`}>
          <CodeWindow />
        </div>
      </div>
    </section>
  );
}
