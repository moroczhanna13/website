import { site } from '../../content';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowUpIcon, GitHubIcon, LinkedInIcon, MailIcon } from '../ui/icons';
import styles from './Footer.module.css';

export function Footer() {
  const { t, tr } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.copy}>
          <span className={styles.logo} aria-hidden="true">
            {site.logo}
          </span>
          © {year} {tr(site.name)}
          <span className={styles.sep} aria-hidden="true">
            ♥
          </span>
          {t.footer.madeWith}
        </p>

        <ul className={styles.social}>
          <li>
            <a href={`mailto:${site.email}`} aria-label={t.contact.email}>
              <MailIcon size={18} />
            </a>
          </li>
          <li>
            <a href={site.github} target="_blank" rel="noopener noreferrer" aria-label={`GitHub ${t.newTab}`}>
              <GitHubIcon size={18} />
            </a>
          </li>
          <li>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`LinkedIn ${t.newTab}`}>
              <LinkedInIcon size={18} />
            </a>
          </li>
          <li>
            <a href="#top" className={styles.top}>
              <ArrowUpIcon size={16} />
              {t.footer.backToTop}
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
