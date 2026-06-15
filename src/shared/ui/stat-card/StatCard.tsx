import { type ReactNode } from 'react';

import { Typography } from '../typography';

type StatCardProps = {
	label: string;
	value: ReactNode;
	hint?: string;
	accent?: 'default' | 'success' | 'error' | 'accent';
};

const accentClass: Record<NonNullable<StatCardProps['accent']>, string> = {
	default: 'text-text',
	success: 'text-success',
	error: 'text-error',
	accent: 'text-accent'
};

export const StatCard = ({ label, value, hint, accent = 'default' }: StatCardProps) => {
	return (
		<div className='bg-surface shadow-primary flex flex-col gap-2 rounded-2xl p-5'>
			<Typography variant='caption' className='text-gray-400'>
				{label}
			</Typography>
			<span className={`typography-h2 font-semibold ${accentClass[accent]}`}>{value}</span>
			{hint && (
				<Typography variant='caption' className='text-gray-500'>
					{hint}
				</Typography>
			)}
		</div>
	);
};
