import { site } from '../../content';
import { useLanguage } from '../../context/LanguageContext';
import { asset } from '../../utils';
import { ImageWithFallback } from '../ui/ImageWithFallback';
import styles from './ProfileCard.module.css';

function Corner({ position }: { position: 'top' | 'bottom' }) {
  return (
    <span className={`${styles.corner} ${styles[position]}`} aria-hidden="true">
      <span className={styles.rank}>A</span>
      <span className={styles.suit}>♥</span>
    </span>
  );
}

/** Profile photo framed as an ace of hearts. Falls back to an "MH" monogram. */
export function ProfileCard() {
  const { t } = useLanguage();

  return (
    <div className={styles.stack}>
      <div className={styles.card}>
        <Corner position="top" />
        <ImageWithFallback
          className={styles.photo}
          src={asset(site.profileImage)}
          alt={t.about.photoAlt}
          fallback={
            <div className={styles.monogram} role="img" aria-label={t.about.photoAlt}>
              <span aria-hidden="true">{site.initials}</span>
            </div>
          }
        />
        <Corner position="bottom" />
      </div>
    </div>
  );
}
