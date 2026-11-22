import { useEffect, useRef, useState } from 'react';
import { site } from '../../content';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { useActiveSection } from '../../hooks/useActiveSection';
import { CloseIcon, MenuIcon, MoonIcon, SunIcon } from '../ui/icons';
import styles from './Navbar.module.css';

const SECTION_IDS = ['about', 'projects', 'skills', 'contact'] as const;
const DESKTOP_QUERY = '(min-width: 860px)';

export function Navbar() {
  const { t, lang, toggleLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const active = useActiveSection([...SECTION_IDS]);

  // Slightly stronger header background once the page is scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Mobile menu: Escape closes it, body does not scroll behind it,
  // and it closes when the viewport grows to desktop width.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        burgerRef.current?.focus();
      }
    };
    const mq = window.matchMedia(DESKTOP_QUERY);
    const onResize = () => mq.matches && setOpen(false);
    document.addEventListener('keydown', onKey);
    mq.addEventListener('change', onResize);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onResize);
      document.body.style.overflow = '';
    };
  }, [open]);

  const links = SECTION_IDS.map((id) => ({ id, label: t.nav[id] }));
  const otherLang = lang === 'hu' ? 'en' : 'hu';
  const close = () => setOpen(false);

  return (
    <header className={styles.header} data-scrolled={scrolled || open}>
      <nav className={`container ${styles.nav}`} aria-label={t.nav.label}>
        <a href="#top" className={styles.logo} onClick={close}>
          <span aria-hidden="true">{site.logo}</span>
          <span className="sr-only">{t.nav.home}</span>
        </a>

        <div id="nav-menu" className={styles.menu} data-open={open}>
          <ul className={styles.links}>
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={styles.link}
                  aria-current={active === link.id ? 'location' : undefined}
                  onClick={close}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className={styles.controls}>
            <button type="button" className={styles.langToggle} onClick={toggleLang}>
              <span aria-hidden="true" data-active={lang === 'hu'}>
                HU
              </span>
              <span aria-hidden="true" className={styles.slash}>
                /
              </span>
              <span aria-hidden="true" data-active={lang === 'en'}>
                EN
              </span>
              <span className="sr-only" lang={otherLang}>
                {t.nav.switchLang}
              </span>
            </button>

            <button
              type="button"
              className={styles.iconButton}
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? t.nav.toLight : t.nav.toDark}
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>
        </div>

        <button
          ref={burgerRef}
          type="button"
          className={`${styles.iconButton} ${styles.burger}`}
          aria-expanded={open}
          aria-controls="nav-menu"
          aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </nav>
    </header>
  );
}
