import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations } from '@/lib/translations';
import { Language } from '@/lib/types';

type Translations = typeof translations.en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('agri-language');
    return (saved as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('agri-language', lang);
  };

  useEffect(() => {
    document.documentElement.lang = language;
    if (language === 'bn') {
      document.body.classList.add('font-bengali');
    } else {
      document.body.classList.remove('font-bengali');
    }
  }, [language]);

  const t = translations[language] as Translations;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
