import { RouterProvider } from '@tanstack/react-router';
import { Suspense, useEffect } from 'react';

import { router } from '@/app/routes';

import { queryClient } from '@/shared/api';
import { i18n } from '@/shared/i18n';
import { Spinner } from '@/shared/ui';

import { QueryProvider } from './QueryProvider';

export const Provider = () => {
	useEffect(() => {
		const handleLanguageChange = () => {
			void queryClient.invalidateQueries();
		};

		i18n.on('languageChanged', handleLanguageChange);
		return () => i18n.off('languageChanged', handleLanguageChange);
	}, []);

	return (
		<QueryProvider>
			<Suspense fallback={<Spinner />}>
				<RouterProvider router={router} context={{ queryClient }} />
			</Suspense>
		</QueryProvider>
	);
};
