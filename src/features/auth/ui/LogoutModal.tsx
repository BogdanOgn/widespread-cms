import { useTranslation } from 'react-i18next';

import { Button, Modal, type ModalComponentProps, Typography } from '@/shared/ui';

import { useLogout } from '../api';

export const LogoutModal = ({ isOpen, close }: ModalComponentProps) => {
	const { t } = useTranslation();
	const logout = useLogout();

	const handleLogout = () => {
		logout.mutate(undefined, {
			onSuccess: () => {
				close();
			}
		});
	};

	return (
		<Modal isOpen={isOpen} close={close} className='shadow-primary rounded-2xl p-6'>
			<Typography variant='h3' as='h3' className='mb-6'>
				{t('modals.logout.title')}
			</Typography>
			<div className='flex gap-3'>
				<Button
					variant='danger'
					onClick={handleLogout}
					className='flex-1'
					disabled={logout.isPending}
				>
					{logout.isPending ? t('common.loading') : t('modals.logout.confirm')}
				</Button>
				<Button variant='primary' onClick={close} className='flex-1'>
					{t('common.close')}
				</Button>
			</div>
		</Modal>
	);
};
