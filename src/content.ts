export type Lang = 'hu' | 'en';
export type Localized<T = string> = Record<Lang, T>;

export const languages: Lang[] = ['hu', 'en'];
export const defaultLang: Lang = 'hu';


export const site = {
  name: { hu: 'Mórocz Hanna', en: 'Hanna Mórocz' } as Localized,
  initials: 'MH',
  logo: '<mh />',
  email: 'moroczhanna@gmail.com',
  github: 'https://github.com/moroczhanna13',
  githubHandle: 'moroczhanna13',
  linkedin: 'https://www.linkedin.com/in/hanna-m%C3%B3rocz/',
  linkedinHandle: 'hanna-mórocz',


  profileImage: 'images/profile.jpg',
  cvFile: 'Morocz_Hanna_CV.pdf',
  cvDownloadName: 'Morocz_Hanna_CV.pdf',
  ogImage: 'og-image.png',
};

//SEO – cím, leírás (böngészőfül, Google, link-előnézet)

export const meta: Localized<{ title: string; description: string; ogLocale: string }> = {
  hu: {
    title: 'Mórocz Hanna – Software Developer · BME',
    description:
      'Mórocz Hanna mérnökinformatikus hallgató (BME) portfóliója: projektek, készségek és elérhetőség. Heti 20 órás szoftverfejlesztő gyakornoki pozíciót keres.',
    ogLocale: 'hu_HU',
  },
  en: {
    title: 'Hanna Mórocz – Software Developer · BME',
    description:
      'Portfolio of Hanna Mórocz, Computer Engineering student at BME: projects, skills and contact. Looking for a part-time (20 h/week) software developer internship.',
    ogLocale: 'en_US',
  },
};

//"hanna.ts" fájl tartalma
export const codeSnippet: Localized = {
  hu: `const hanna = {
  name: "Mórocz Hanna",
  role: "Software Developer",
  studies: {
    degree: "Mérnökinformatikus BSc",
    university: "BME",
    since: 2024,
    semester: 5,
    specialization: "Szoftverfejlesztő",
  },
  lookingFor: "Szoftverfejlesztő gyakornok, heti 20 óra",
  favoriteTech: [
    "TypeScript", "C++",
    "Java", "Python",
  ],
} as const;

export default hanna;`,
  en: `const hanna = {
  name: "Hanna Mórocz",
  role: "Software Developer",
  studies: {
    degree: "Computer Engineering BSc",
    university: "BME",
    since: 2024,
    semester: 5,
    specialization: "Software Development",
  },
  lookingFor: "Software developer intern, 20 h/week",
  favoriteTech: [
    "TypeScript", "C++",
    "Java", "Python",
  ],
} as const;

export default hanna;`,
};

//projektek
export interface Project {
  id: string;
  title: Localized;
  summary: Localized;
  details?: Localized;
  label?: Localized;
  tags: string[];
  image: string;
  github: string;
  demo: string;
}

export const projects: Project[] = [
  {
    id: 'mocsar',
    title: { hu: 'Mocsár', en: 'Mocsár' },
    label: { hu: 'Saját projekt', en: 'Personal project' },
    summary: {
      hu: 'Online többjátékos kártyajáték 7–15 főre – a baráti körünkben játszott játék online változata.',
      en: 'An online multiplayer card game for 7–15 players – a digital version of the game we play in our circle of friends.',
    },
    details: {
      hu: 'Többmodulos Maven-projekt külön szabálymotorral, gépi játékossal és valós idejű, WebSocket-alapú Spring Boot szerverrel. A backend Renderen, a frontend GitHub Pagesen fut, a buildet GitHub Actions ellenőrzi.',
      en: 'A multi-module Maven project with a separate rules engine, a computer player and a real-time Spring Boot server over WebSocket. The backend runs on Render, the frontend on GitHub Pages, and GitHub Actions checks every build.',
    },
    tags: ['Java', 'Spring Boot', 'WebSocket', 'Spring Data JPA', 'Vite', 'Docker', 'GitHub Actions'],
    image: 'images/projects/mocsar.png',
    github: 'https://github.com/moroczhanna13/mocsar',
    demo: 'https://moroczhanna13.github.io/mocsar/'
  },
  {
    id: 'walker-rl',
    title: { hu: 'Walker RL', en: 'Walker RL' },
    label: { hu: 'Saját projekt', en: 'Personal project' },
    summary: {
      hu: 'Kétlábú robot (MuJoCo Walker2d) megtanítása járásra megerősítéses tanulással.',
      en: 'Teaching a 2D biped (MuJoCo Walker2d) to walk with reinforcement learning.',
    },
    details: {
      hu: 'PPO és SAC összehasonlítása, megfigyelés- és jutalomnormalizálással 4,5 m/s-os, eséstől mentes járás. Lökésállóság és domain randomization tesztelése.',
      en: 'PPO vs SAC comparison; with observation/reward normalization the walker reaches 4.5 m/s without falling. Tested for push robustness and with domain randomization.',
    },
    tags: ['Python', 'Reinforcement Learning', 'PPO', 'SAC', 'Stable-Baselines3', 'Gymnasium', 'MuJoCo'],
    image: 'images/projects/walker-rl.png',
    github: 'https://github.com/moroczhanna13/walker-rl',
    demo: '',
  },
  {
    id: 'fenyohaza-titka',
    title: { hu: 'Fenyőháza titka', en: 'Fenyőháza titka' },
    label: { hu: 'Saját projekt', en: 'Personal project' },
    summary: {
      hu: 'Magyar nyelvű nyomozós webes játék, amelyet egy szimulált telefon felületén játszol.',
      en: 'A Hungarian-language detective game for the browser, played entirely through a simulated phone.',
    },
    details: {
      hu: 'Telefonszimulációs felület, választásokon alapuló párbeszédek és hang – a döntéseid alakítják a nyomozást.',
      en: 'A phone-style interface, choice-driven dialogue and sound – your decisions shape how the investigation unfolds.',
    },
    tags: ['React', 'TypeScript', 'Vite', 'HTML', 'CSS'],
    image: 'images/projects/fenyohaza-titka.png',
    github: 'https://github.com/moroczhanna13/fenyohaza-titka',
    demo: 'https://moroczhanna13.github.io/fenyohaza-titka',
  },
  {
    id: 'kvizalkalmazas',
    title: { hu: 'Kvízalkalmazás', en: 'Quiz App' },
    label: { hu: 'Egyetemi projekt', en: 'University project' },
    summary: {
      hu: 'Interaktív kvízalkalmazás React-alapon.',
      en: 'An interactive quiz app built with React.',
    },
    tags: ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS'],
    image: 'images/projects/kvizalkalmazas.png',
    github: 'https://github.com/moroczhanna13/kvizApp', 
    demo: '',
  },
  {
    id: 'vibe-ajanlo',
    title: {
      hu: 'Szemantikus dalszöveg ajánló',
      en: 'Vibe-based Lyrics Recommender',
    },
    label: { hu: 'Egyetemi projekt', en: 'University project' },
    summary: {
      hu: 'Szemantikus hasonlóságon alapuló ajánló, amely a megadott hangulathoz illő dalszövegeket keres.',
      en: 'Describe a mood and get song lyrics that fit it, matched by semantic similarity.',
    },
    tags: ['Python', 'NLP', 'Google Colab', 'LLM', 'Semantic Search'],
    image: 'images/projects/vibe-ajanlo.png', 
    github: '',
    demo: '',
  },
];

//készségek
export interface SkillGroup {
  suit: '♠' | '♥' | '♦' | '♣';
  name: Localized;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    suit: '♠',
    name: { hu: 'Nyelvek', en: 'Languages' },
    items: ['Java', 'C', 'C++', 'Kotlin', 'Swift', 'Python', 'TypeScript', 'JavaScript'],
  },
  {
    suit: '♥',
    name: { hu: 'Backend', en: 'Backend' },
    items: ['Spring Boot', 'WebSocket', 'Spring Data JPA', '.NET'],
  },
  {
    suit: '♣',
    name: { hu: 'Frontend', en: 'Frontend' },
    items: ['React', 'Vite', 'HTML', 'CSS'],
  },
  {
    suit: '♦',
    name: { hu: 'Eszközök', en: 'Tools' },
    items: ['Git', 'GitHub', 'GitHub Actions', 'Docker', 'Maven', 'Render', 'GitHub Pages'],
  },
  {
    suit: '♠',
    name: { hu: 'Gépi tanulás', en: 'Machine Learning' },
    items: ['Reinforcement Learning', 'PPO', 'SAC'],
  },
];

//Felületi szövegek nyelvenként
export interface UiText {
  skipLink: string;
  nav: {
    label: string;
    about: string;
    projects: string;
    skills: string;
    contact: string;
    openMenu: string;
    closeMenu: string;
    switchLang: string;
    toLight: string;
    toDark: string;
    home: string;
  };
  hero: {
    greeting: string;
    subtitle: string;
    intro: string;
    ctaProjects: string;
    ctaGithub: string;
    ctaCv: string;
    codeLabel: string;
  };
  about: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    photoAlt: string;
    statusFile: string;
    statusBadge: string;
    status: { label: string; value: string }[];
  };
  projects: {
    eyebrow: string;
    title: string;
    intro: string;
    github: string;
    demo: string;
    showBack: string;
    showFront: string;
    techTitle: string;
    imageAlt: (title: string) => string;
    linkSuffix: (title: string) => string;
  };
  skills: {
    eyebrow: string;
    title: string;
    intro: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    text: string;
    email: string;
    github: string;
    linkedin: string;
  };
  footer: {
    madeWith: string;
    backToTop: string;
  };
  newTab: string;
}

export const ui: Localized<UiText> = {
  hu: {
    skipLink: 'Ugrás a tartalomhoz',
    nav: {
      label: 'Fő navigáció',
      about: 'Rólam',
      projects: 'Projektek',
      skills: 'Készségek',
      contact: 'Kapcsolat',
      openMenu: 'Menü megnyitása',
      closeMenu: 'Menü bezárása',
      switchLang: 'Switch to English',
      toLight: 'Váltás világos módra',
      toDark: 'Váltás sötét módra',
      home: 'Ugrás az oldal tetejére',
    },
    hero: {
      greeting: '',
      subtitle: 'Software Developer · BME',
      intro:
        'Harmadéves mérnökinformatikus hallgató vagyok a BME-n, szoftverfejlesztő specializáción. Backend-, webes és gépi tanulási projekteken dolgozom – a valós idejű, többjátékos kártyajátéktól a böngészős nyomozós játékon át a megerősítéses tanulással járni tanított robotig. Heti 20 órás gyakornoki pozíciót keresek.',
      ctaProjects: 'Projektek megtekintése',
      ctaGithub: 'GitHub',
      ctaCv: 'Önéletrajz letöltése',
      codeLabel: 'Kódszerkesztő-ablak: hanna.ts',
    },
    about: {
      eyebrow: 'rólam',
      title: 'Rólam',
      paragraphs: [
        'Mérnökinformatikus BSc hallgató vagyok a BME-n: 2024 óta tanulok itt, most az 5. félévemet töltöm a szoftverfejlesztő specializáción, az Automatizálási és Alkalmazott Informatikai Tanszéken (AUT).',
        'Szabadidőmben szívesen csinálok saját projekteket, akár egyedül, akár csapatban. Saját projektjeim közül párat belinkeltem, ezen felül szaktársaimmal egy akciójáték fejlesztésén dolgozunk.',
        'Heti 20 órás szoftverfejlesztő gyakornoki pozíciót keresek, ahol csapatban, valódi feladatokon fejlődhetek tovább. Ha épp nem kódolok, sportolok – leginkább futni járok.',
      ],
      photoAlt: 'Mórocz Hanna profilképe',
      statusFile: 'status',
      statusBadge: 'Nyitott vagyok új lehetőségekre',
      status: [
        { label: 'Keresett pozíció', value: 'Szoftverfejlesztő gyakornok · heti 20 óra' },
        { label: 'Tanulmányok', value: 'Mérnökinformatikus BSc · BME · 5. félév' },
        { label: 'Nyelvek', value: 'Angol C1 · Német B2' },
        { label: 'Helyszín', value: 'Budapest' },
      ],
    },
    projects: {
      eyebrow: 'projektek',
      title: 'Projektek',
      intro: 'Minden projekt egy lap a pakliban. Fordítsd meg a kártyát, és a hátoldalán megnézheted, mivel készült.',
      github: 'GitHub',
      demo: 'Élő demó',
      showBack: 'Technológiák',
      showFront: 'Előlap',
      techTitle: 'Technológiák',
      imageAlt: (title) => `Képernyőkép: ${title}`,
      linkSuffix: (title) => ` – ${title}`,
    },
    skills: {
      eyebrow: 'készségek',
      title: 'Készségek',
      intro: 'Nyelvek, keretrendszerek és eszközök, amelyekkel eddig dolgoztam.',
    },
    contact: {
      eyebrow: 'kapcsolat',
      title: 'Írj nekem!',
      text: 'Ha gyakornoki lehetőséged van, vagy kérdésed van valamelyik projektemmel kapcsolatban, keress bátran.',
      email: 'E-mail',
      github: 'GitHub',
      linkedin: 'LinkedIn',
    },
    footer: {
      madeWith: '',
      backToTop: 'Vissza a tetejére',
    },
    newTab: '(új lapon nyílik meg)',
  },

  en: {
    skipLink: 'Skip to content', 
    nav: {
      label: 'Main navigation',
      about: 'About',
      projects: 'Projects',
      skills: 'Skills',
      contact: 'Contact',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      switchLang: 'Váltás magyarra',
      toLight: 'Switch to light mode',
      toDark: 'Switch to dark mode',
      home: 'Back to the top of the page',
    },
    hero: {
      greeting: "Hi, I'm",
      subtitle: 'Software Developer · BME',
      intro:
        "I'm a third-year Computer Engineering student at BME in Budapest, specializing in software development. I build backend, web and machine learning projects – from a real-time multiplayer card game and a detective game that runs in the browser to a robot that learns to walk through reinforcement learning. Right now I'm looking for a part-time internship, 20 hours a week.",
      ctaProjects: 'See my projects',
      ctaGithub: 'GitHub',
      ctaCv: 'Download CV',
      codeLabel: 'Code editor window: hanna.ts',
    },
    about: {
      eyebrow: 'about',
      title: 'About me',
      paragraphs: [
        "I'm studying Computer Engineering (BSc) at the Budapest University of Technology and Economics. I started in 2024 and I'm now in my fifth semester, specializing in software development at the Department of Automation and Applied Informatics (AUT).",
        "I enjoy working on personal projects in my free time, either alone or in a team. I've linked a few of my own projects here, and I'm also working with classmates on developing an action game.",
        "I'm looking for a 20-hour-a-week software developer internship where I can keep growing on a real team, working on real problems. When I'm not coding, I'm usually doing sports – most often running.",
      ],
      photoAlt: 'Portrait of Hanna Mórocz',
      statusFile: 'status',
      statusBadge: 'Open to opportunities',
      status: [
        { label: 'Looking for', value: 'Software developer internship · 20 h/week' },
        { label: 'Studies', value: 'Computer Engineering BSc · BME · 5th semester' },
        { label: 'Languages', value: 'English C1 · German B2' },
        { label: 'Location', value: 'Budapest, Hungary' },
      ],
    },
    projects: {
      eyebrow: 'projects',
      title: 'Projects',
      intro: 'Every project is a card in the deck. Flip one over to see what it was built with.',
      github: 'GitHub',
      demo: 'Live demo',
      showBack: 'Tech stack',
      showFront: 'Front',
      techTitle: 'Built with',
      imageAlt: (title) => `Screenshot of ${title}`,
      linkSuffix: (title) => ` – ${title}`,
    },
    skills: {
      eyebrow: 'skills',
      title: 'Skills',
      intro: "Languages, frameworks and tools I've worked with so far.",
    },
    contact: {
      eyebrow: 'contact',
      title: "Let's talk",
      text: 'Have an internship opening, or a question about one of my projects? Drop me a line – I’d be glad to hear from you.',
      email: 'Email',
      github: 'GitHub',
      linkedin: 'LinkedIn',
    },
    footer: {
      madeWith: '',
      backToTop: 'Back to top',
    },
    newTab: '(opens in a new tab)',
  },
};
