import type { DEFAULT_NS } from './config';

import type en from '@public/locales/en/translation.json';

declare module 'i18next' {
	interface CustomTypeOptions {
		defaultNS: typeof DEFAULT_NS;
		resources: {
			translation: typeof en;
		};
	}
}
