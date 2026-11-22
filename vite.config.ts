import { defineConfig, loadEnv, type HtmlTagDescriptor, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { defaultLang, languages, meta, site } from './src/content.ts';

/**
 * Injects <title>, meta description and Open Graph / Twitter tags into
 * index.html from src/content.ts, so every text lives in one place.
 */
function seoFromContent(siteUrl: string): Plugin {
  const m = meta[defaultLang];
  const absolute = (path: string) => (siteUrl ? `${siteUrl.replace(/\/$/, '')}/${path}` : path);

  return {
    name: 'seo-from-content',
    transformIndexHtml(html) {
      const tags: HtmlTagDescriptor[] = [
        { tag: 'meta', attrs: { name: 'description', content: m.description } },
        { tag: 'meta', attrs: { property: 'og:type', content: 'website' } },
        { tag: 'meta', attrs: { property: 'og:title', content: m.title } },
        { tag: 'meta', attrs: { property: 'og:description', content: m.description } },
        { tag: 'meta', attrs: { property: 'og:image', content: absolute(site.ogImage) } },
        { tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
        { tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
        { tag: 'meta', attrs: { property: 'og:image:alt', content: m.title } },
        { tag: 'meta', attrs: { property: 'og:locale', content: m.ogLocale } },
        ...languages
          .filter((l) => l !== defaultLang)
          .map<HtmlTagDescriptor>((l) => ({
            tag: 'meta',
            attrs: { property: 'og:locale:alternate', content: meta[l].ogLocale },
          })),
        { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
        { tag: 'meta', attrs: { name: 'twitter:title', content: m.title } },
        { tag: 'meta', attrs: { name: 'twitter:description', content: m.description } },
        { tag: 'meta', attrs: { name: 'twitter:image', content: absolute(site.ogImage) } },
      ];
      if (siteUrl) {
        tags.push(
          { tag: 'meta', attrs: { property: 'og:url', content: siteUrl } },
          { tag: 'link', attrs: { rel: 'canonical', href: siteUrl } },
        );
      }
      const escaped = m.title.replace(/&/g, '&amp;').replace(/</g, '&lt;');
      return {
        html: html.replace(/<title>.*?<\/title>/, `<title>${escaped}</title>`),
        tags: tags.map((t) => ({ ...t, injectTo: 'head' as const })),
      };
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  // BASE_PATH: e.g. "/weboldal/" for https://<user>.github.io/weboldal/
  // SITE_URL:  full public URL, needed for absolute Open Graph image links.
  // Both are set automatically by .github/workflows/deploy.yml.
  const base = env.BASE_PATH || '/';
  const siteUrl = env.SITE_URL || '';

  return {
    base,
    plugins: [react(), seoFromContent(siteUrl)],
  };
});
