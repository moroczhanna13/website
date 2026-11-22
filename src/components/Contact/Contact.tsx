import { site } from '../../content';
import { useLanguage } from '../../context/LanguageContext';
import { GitHubIcon, LinkedInIcon, MailIcon } from '../ui/icons';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import styles from './Contact.module.css';

export function Contact() {
  const { t } = useLanguage();

  const links = [
    { label: t.contact.email, value: site.email, href: `mailto:${site.email}`, icon: <MailIcon size={22} />, external: false },
    { label: t.contact.github, value: site.githubHandle, href: site.github, icon: <GitHubIcon size={22} />, external: true },
    { label: t.contact.linkedin, value: site.linkedinHandle, href: site.linkedin, icon: <LinkedInIcon size={22} />, external: true },
  ];

  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-title">
      <div className="container">
        <div className={styles.box}>
          <SectionHeading
            id="contact-title"
            suit="♣"
            eyebrow={t.contact.eyebrow}
            title={t.contact.title}
            intro={t.contact.text}
          />
          <ul className={styles.links}>
            {links.map((link, i) => (
              <Reveal as="li" key={link.label} delay={i * 90}>
                <a
                  href={link.href}
                  className={styles.link}
                  {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  <span className={styles.icon}>{link.icon}</span>
                  <span className={styles.linkText}>
                    <span className={styles.linkLabel}>{link.label}</span>
                    <span className={styles.linkValue}>{link.value}</span>
                  </span>
                  {link.external && <span className="sr-only">{t.newTab}</span>}
                  <span className={styles.arrow} aria-hidden="true">
                    ♥
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
