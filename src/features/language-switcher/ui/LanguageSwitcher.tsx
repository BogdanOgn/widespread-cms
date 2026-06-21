import { BsTranslate } from 'react-icons/bs';

import { LANGUAGES, useLanguage } from '@/shared/i18n';
import { Button } from '@/shared/ui';

export const LanguageSwitcher = () => {
	const { language, changeLanguage } = useLanguage();

	const handleToggle = () => {
		const next = LANGUAGES.find(lang => lang !== language);
		if (next) void changeLanguage(next);
	};

	return (
		<Button
			variant='unstyled'
			size='unstyled'
			onClick={handleToggle}
			className='typography-caption trs hover:text-accent-hover flex items-center gap-1 uppercase'
		>
			<BsTranslate className='text-gray-500' />
			{language}
		</Button>
	);
};
