import { Reveal } from './Reveal';
import styles from './SectionHeading.module.css';

export type Suit = '♠' | '♥' | '♦' | '♣';

export const isRedSuit = (suit: Suit) => suit === '♥' || suit === '♦';

interface Props {
  id: string;
  suit: Suit;
  eyebrow: string;
  title: string;
  intro?: string;
}

export function SectionHeading({ id, suit, eyebrow, title, intro }: Props) {
  return (
    <Reveal as="header" className={styles.heading}>
      <p className={styles.eyebrow}>
        <span className={isRedSuit(suit) ? styles.red : styles.black} aria-hidden="true">
          {suit}
        </span>
        {eyebrow}
      </p>
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      {intro && <p className={styles.intro}>{intro}</p>}
    </Reveal>
  );
}
