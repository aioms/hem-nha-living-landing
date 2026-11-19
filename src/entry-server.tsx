import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { LanguageProvider } from './context/LanguageContext';
import { ROUTES, ORIGIN, localizedPath, languageFromPath } from './seo/routes';
import { renderHead } from './seo/metadata';

export const paths = ROUTES.flatMap(route => ['vi', 'en'].map(language => localizedPath(route.path, language as 'vi' | 'en')));
export { ORIGIN };
export function render(path: string) {
  const language = languageFromPath(path);
  const html = renderToString(<StrictMode><LanguageProvider initialLanguage={language}><App initialPath={path} /></LanguageProvider></StrictMode>);
  return { html, head: renderHead(path, language), language };
}
