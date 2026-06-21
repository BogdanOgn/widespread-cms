import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { BsBag, BsBoxArrowLeft, BsColumnsGap, BsHouse, BsPeople } from 'react-icons/bs';

import clsx from 'clsx';

import { LanguageSwitcher } from '@/features/language-switcher';

import { ROUTES } from '@/shared/config';
import { Button, useOpenModal } from '@/shared/ui';

const sidebarLinksList = [
	{
		icon: <BsHouse />,
		titleKey: 'sidebar.home',
		href: ROUTES.HOME,
		disabled: false
	},
	{
		icon: <BsBag />,
		titleKey: 'sidebar.products',
		href: ROUTES.PRODUCTS,
		disabled: false
	},
	{
		icon: <BsColumnsGap />,
		titleKey: 'sidebar.dashboard',
		href: ROUTES.DASHBOARD,
		disabled: true
	},
	{
		icon: <BsPeople />,
		titleKey: 'sidebar.users',
		href: ROUTES.USERS,
		disabled: true
	}
] as const;

export const Sidebar = () => {
	const { t } = useTranslation();
	const openModal = useOpenModal();

	const handleOpenLogoutModal = () => {
		openModal('logout');
	};

	return (
		<div className='shadow-primary bg-surface sticky top-0 flex h-screen flex-col rounded-tr-2xl rounded-br-2xl p-5'>
			<Link to={ROUTES.HOME} className='hover:text-accent-hover trs typography-h2 mb-9 text-center'>
				{t('common.appName')}
			</Link>
			<div className='flex flex-1 flex-col gap-2'>
				{sidebarLinksList.map(link => {
					const linkClass = clsx(
						'hover:text-accent-hover [&.active]:text-accent [&.active]:hover:text-accent typography-body-lg trs flex items-center gap-1.5 ',
						{
							'opacity-50 pointer-events-none': link.disabled
						}
					);
					return (
						<Link key={link.href} to={link.href} className={linkClass}>
							{link.icon}
							{t(link.titleKey)}
						</Link>
					);
				})}
			</div>
			<div className='flex flex-col items-start gap-4'>
				<LanguageSwitcher />
				<Button
					variant='unstyled'
					size='unstyled'
					onClick={handleOpenLogoutModal}
					className='text-error hover:text-error-hover trs typography-caption flex items-baseline'
				>
					<BsBoxArrowLeft />
					{t('sidebar.logout')}
				</Button>
			</div>
		</div>
	);
};
