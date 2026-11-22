import { About } from './components/About/About';
import { Contact } from './components/Contact/Contact';
import { Footer } from './components/Footer/Footer';
import { Hero } from './components/Hero/Hero';
import { Navbar } from './components/Navbar/Navbar';
import { Projects } from './components/Projects/Projects';
import { Skills } from './components/Skills/Skills';
import { useLanguage } from './context/LanguageContext';

export default function App() {
  const { t } = useLanguage();

  return (
    <>
      <a href="#main" className="skip-link">
        {t.skipLink}
      </a>
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
