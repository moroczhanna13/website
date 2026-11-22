import { useLanguage } from '../../context/LanguageContext';
import { ProfileCard } from '../ProfileCard/ProfileCard';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import styles from './About.module.css';

export function About() {
  const { t } = useLanguage();
  const a = t.about;

  return (
    <section id="about" className={styles.section} aria-labelledby="about-title">
      <div className="container">
        <SectionHeading id="about-title" suit="♠" eyebrow={a.eyebrow} title={a.title} />

        <div className={styles.grid}>
          <Reveal className={styles.photo}>
            <ProfileCard />
          </Reveal>

          <div className={styles.content}>
            <Reveal className={styles.text} delay={100}>
              {a.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </Reveal>

            <Reveal className={styles.panel} delay={200}>
              <div className={styles.panelHeader}>
                <span className={styles.panelFile} aria-hidden="true">
                  {a.statusFile}
                </span>
                <p className={styles.badge}>
                  <span className={styles.dot} aria-hidden="true" />
                  {a.statusBadge}
                </p>
              </div>
              <dl className={styles.list}>
                {a.status.map((item) => (
                  <div key={item.label} className={styles.row}>
                    <dt>{item.label}</dt>
                    <dd>{item.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
