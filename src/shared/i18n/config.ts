export const DEFAULT_NS = 'translation';

export const LANGUAGES = ['en', 'ru'] as const;

export type Language = (typeof LANGUAGES)[number];

export const DEFAULT_LANGUAGE: Language = 'en';

export const FALLBACK_LANGUAGE: Language = 'en';

export const LANGUAGE_STORAGE_KEY = 'lang';
