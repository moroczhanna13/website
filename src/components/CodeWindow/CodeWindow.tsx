import { useEffect, useMemo, useState } from 'react';
import { codeSnippet } from '../../content';
import { useLanguage } from '../../context/LanguageContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { sliceTokens, tokenize, type Token } from './highlight';
import styles from './CodeWindow.module.css';

const START_DELAY = 600; // ms before typing starts
const CHAR_DELAY = 24; // ms per character

function Highlighted({ tokens }: { tokens: Token[] }) {
  return (
    <>
      {tokens.map((tok, i) =>
        tok.type === 'space' ? tok.text : (
          <span key={i} className={styles[tok.type]}>
            {tok.text}
          </span>
        ),
      )}
    </>
  );
}

export function CodeWindow() {
  const { lang, t } = useLanguage();
  const reduced = useReducedMotion();
  const source = codeSnippet[lang];
  const tokens = useMemo(() => tokenize(source), [source]);
  const lineCount = source.split('\n').length;
  const [typed, setTyped] = useState(0);

  // Typing animation: restart when the language changes, skip it entirely
  // with reduced motion. Indentation is "typed" in one go.
  useEffect(() => {
    if (reduced) {
      setTyped(source.length);
      return;
    }
    setTyped(0);
    let pos = 0;
    let timer: number;
    const step = () => {
      pos += 1;
      while (pos < source.length && source[pos - 1] === '\n' && source[pos] === ' ') pos += 1;
      while (pos < source.length && source[pos] === ' ' && source[pos + 1] === ' ') pos += 1;
      setTyped(pos);
      if (pos < source.length) timer = window.setTimeout(step, CHAR_DELAY);
    };
    timer = window.setTimeout(step, START_DELAY);
    return () => window.clearTimeout(timer);
  }, [source, reduced]);

  const done = typed >= source.length;

  return (
    <figure className={styles.window} aria-label={t.hero.codeLabel}>
      <div className={styles.titlebar} aria-hidden="true">
        <span className={styles.dots}>
          <span>♥</span>
          <span>♦</span>
          <span>♣</span>
        </span>
        <span className={styles.tab}>
          <span className={styles.tsBadge}>TS</span>
          hanna.ts
        </span>
      </div>

      <div className={styles.body}>
        <ol className={styles.gutter} aria-hidden="true">
          {Array.from({ length: lineCount }, (_, i) => (
            <li key={i}>{i + 1}</li>
          ))}
        </ol>

        <div className={styles.code}>
          {/* Full code: reserves the final size and is what screen readers read. */}
          <pre className={styles.layer} data-hidden={!done}>
            <code>
              <Highlighted tokens={tokens} />
              {done && <span className={styles.cursor} aria-hidden="true" />}
            </code>
          </pre>
          {/* Typed part, drawn on top while the animation runs. */}
          {!done && (
            <pre className={`${styles.layer} ${styles.typing}`} aria-hidden="true">
              <code>
                <Highlighted tokens={sliceTokens(tokens, typed)} />
                <span className={styles.cursor} />
              </code>
            </pre>
          )}
        </div>
      </div>

      <div className={styles.statusbar} aria-hidden="true">
        <span>♥ main</span>
        <span>TypeScript · UTF-8</span>
      </div>
    </figure>
  );
}
