import { type ReactNode, useEffect, useRef, useState } from 'react';
import { FaFilter } from 'react-icons/fa';

import clsx from 'clsx';

import { Button } from '../button';
import { Typography } from '../typography';

type FilterDropdownProps = {
	title: string;
	actions?: ReactNode;
	children: ReactNode;
};

export const FilterDropdown = ({ title, actions, children }: FilterDropdownProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [isOpen]);

	return (
		<div ref={rootRef} className='bg-surface shadow-primary relative z-15 rounded-2xl p-5'>
			<div className='flex items-center justify-between'>
				<Button
					type='button'
					variant='unstyled'
					className='group flex items-center gap-2'
					onClick={() => setIsOpen(prev => !prev)}
					aria-expanded={isOpen}
				>
					<FaFilter
						size={16}
						className={clsx('group-hover:text-accent-hover transition', {
							'text-accent': isOpen
						})}
					/>
					<Typography
						variant='h3'
						as='h3'
						className={clsx('group-hover:text-accent-hover transition', {
							'text-accent': isOpen
						})}
					>
						{title}
					</Typography>
				</Button>
				{actions}
			</div>

			<div
				className={clsx(
					'bg-surface shadow-primary absolute inset-x-0 top-full z-20 mt-3 origin-top rounded-2xl p-5 transition duration-200 ease-in-out',
					isOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-1 opacity-0'
				)}
			>
				{children}
			</div>
		</div>
	);
};
