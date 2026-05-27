import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

import { Button } from '../button';

type PaginationProps = {
	page: number;
	pages: number;
	onChange: (page: number) => void;
	className?: string;
};

export const Pagination = ({ page, pages, onChange, className }: PaginationProps) => {
	if (pages <= 1) return null;

	const getPageNumbers = () => {
		const delta = 2;
		const range: (number | '...')[] = [];
		const left = Math.max(2, page - delta);
		const right = Math.min(pages - 1, page + delta);

		range.push(1);
		if (left > 2) range.push('...');
		for (let i = left; i <= right; i++) range.push(i);
		if (right < pages - 1) range.push('...');
		if (pages > 1) range.push(pages);

		return range;
	};

	return (
		<div className={twMerge('flex items-center justify-center gap-1 px-5 py-4', className)}>
			<Button onClick={() => onChange(page - 1)} disabled={page === 1} variant='unstyled'>
				<BsChevronLeft size={14} />
			</Button>

			{getPageNumbers().map((p, i) => {
				const pageClass = clsx({
					'bg-accent text-white': p === page,
					'text-accent bg-white hover:text-white': p !== page
				});

				return p === '...' ? (
					<span
						key={`ellipsis-${i}`}
						className='flex h-8 w-8 items-center justify-center text-gray-400'
					>
						…
					</span>
				) : (
					<Button key={p} onClick={() => onChange(p)} className={pageClass}>
						{p}
					</Button>
				);
			})}

			<Button onClick={() => onChange(page + 1)} disabled={page === pages} variant='unstyled'>
				<BsChevronRight size={14} />
			</Button>
		</div>
	);
};
