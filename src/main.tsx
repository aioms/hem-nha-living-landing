import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { LanguageProvider } from './context/LanguageContext';
import { languageFromPath } from './seo/routes';

const root = document.getElementById('root')!;
const path = window.location.pathname;
const app = <StrictMode><LanguageProvider initialLanguage={languageFromPath(path)}><App initialPath={path} /></LanguageProvider></StrictMode>;
if (root.dataset.prerendered === 'true') hydrateRoot(root, app);
else createRoot(root).render(app);
