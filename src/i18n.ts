import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { en } from './locales/en'
import { th } from './locales/th'

void i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, th: { translation: th } },
  lng: localStorage.getItem('language') ?? 'th',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

document.documentElement.lang = i18n.language.startsWith('en') ? 'en' : 'th'
i18n.on('languageChanged', (language) => {
  document.documentElement.lang = language.startsWith('en') ? 'en' : 'th'
})

export default i18n
