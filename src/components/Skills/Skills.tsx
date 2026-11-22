import { skillGroups } from '../../content';
import { useLanguage } from '../../context/LanguageContext';
import { Reveal } from '../ui/Reveal';
import { SectionHeading, isRedSuit } from '../ui/SectionHeading';
import styles from './Skills.module.css';

export function Skills() {
  const { t, tr } = useLanguage();

  return (
    <section id="skills" className={styles.section} aria-labelledby="skills-title">
      <div className="container">
        <SectionHeading
          id="skills-title"
          suit="♦"
          eyebrow={t.skills.eyebrow}
          title={t.skills.title}
          intro={t.skills.intro}
        />
        <ul className={styles.grid}>
          {skillGroups.map((group, i) => {
            const name = tr(group.name);
            const headingId = `skills-${i}`;
            return (
              <Reveal
                as="li"
                key={headingId}
                delay={i * 90}
                className={styles.group}
                data-suit={isRedSuit(group.suit) ? 'red' : 'black'}
              >
                <span className={styles.corner} aria-hidden="true">
                  {group.suit}
                </span>
                <h3 id={headingId} className={styles.name}>
                  {name}
                </h3>
                <ul className={styles.tags} aria-labelledby={headingId}>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <span className={styles.bigSuit} aria-hidden="true">
                  {group.suit}
                </span>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
