import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import enTranslation from './resources/locales/en/translation.json'

i18next
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    ns: ['translationsNS'],
    defaultNS: 'translationsNS',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translationsNS: enTranslation,
      },
    },
  })
  .then()

export { i18next }
