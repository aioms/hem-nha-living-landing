import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Language, Translations } from '../i18n/translations';
import { languageFromPath, localizedPath, navigate } from '../seo/routes';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode; initialLanguage?: Language }> = ({ children, initialLanguage = 'vi' }) => {
  // URL owns language: same HTML for crawlers, visitors and hydration.
  const [language, setLanguageState] = useState<Language>(initialLanguage);
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    navigate(localizedPath(window.location.pathname, lang) + window.location.hash);
  };
  useEffect(() => {
    const sync = () => setLanguageState(languageFromPath(window.location.pathname));
    window.addEventListener('popstate', sync);
    window.addEventListener('site:navigate', sync);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener('site:navigate', sync);
    };
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'vi' ? 'en' : 'vi');
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    toggleLanguage,
    t: translations[language],
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
