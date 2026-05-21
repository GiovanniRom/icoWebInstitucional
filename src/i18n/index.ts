import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import es from './locales/es.json'
import en from './locales/en.json'

const STORAGE_KEY = 'ico-lang'

const savedLang = localStorage.getItem(STORAGE_KEY)
const initialLang = savedLang === 'en' || savedLang === 'es' ? savedLang : 'es'

void i18n.use(initReactI18next).init({
  resources: {
    es: { translation: es },
    en: { translation: en },
  },
  lng: initialLang,
  fallbackLng: 'es',
  interpolation: {
    escapeValue: false,
  },
})

export function setLanguage(lang: 'es' | 'en') {
  void i18n.changeLanguage(lang)
  localStorage.setItem(STORAGE_KEY, lang)
}

export default i18n
