import { type ReactNode } from 'react';

import { Typography } from '../typography';

type ChartCardProps = {
	title: string;
	children: ReactNode;
	className?: string;
	bodyClassName?: string;
};

export const ChartCard = ({
	title,
	children,
	className = '',
	bodyClassName = 'h-72 w-full'
}: ChartCardProps) => {
	return (
		<div className={`bg-surface shadow-primary flex flex-col gap-4 rounded-2xl p-5 ${className}`}>
			<Typography variant='h3' as='h3'>
				{title}
			</Typography>
			<div className={bodyClassName}>{children}</div>
		</div>
	);
};
