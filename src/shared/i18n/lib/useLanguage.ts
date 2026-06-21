import { useTranslation } from 'react-i18next';

import { type Language } from '../config';

type UseLanguageReturn = {
	language: Language;
	changeLanguage: (language: Language) => Promise<void>;
};

export const useLanguage = (): UseLanguageReturn => {
	const { i18n } = useTranslation();

	const changeLanguage = async (language: Language) => {
		await i18n.changeLanguage(language);
	};

	return {
		language: i18n.resolvedLanguage as Language,
		changeLanguage
	};
};
