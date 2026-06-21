import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

import { DEFAULT_NS, FALLBACK_LANGUAGE, LANGUAGES, LANGUAGE_STORAGE_KEY } from '../config';

i18n
	.use(HttpBackend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		ns: [DEFAULT_NS],
		defaultNS: DEFAULT_NS,
		fallbackLng: FALLBACK_LANGUAGE,
		supportedLngs: LANGUAGES,
		backend: {
			loadPath: '/locales/{{lng}}/{{ns}}.json'
		},
		detection: {
			order: ['localStorage', 'navigator'],
			lookupLocalStorage: LANGUAGE_STORAGE_KEY,
			caches: ['localStorage']
		},
		interpolation: {
			escapeValue: false
		}
	});

export { i18n };
