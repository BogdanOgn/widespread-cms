import { type InputHTMLAttributes, forwardRef, useId } from 'react';
import type { FieldError } from 'react-hook-form';
import { BsCheckLg } from 'react-icons/bs';

import { twMerge } from 'tailwind-merge';

import { Typography } from '../typography';

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'type'> & {
	label?: string;
	error?: FieldError;
	className?: string;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
	({ label, error, disabled, className, id, ...props }, ref) => {
		const generatedId = useId();
		const inputId = id ?? generatedId;

		return (
			<div className={twMerge('flex flex-col gap-1.5', className)}>
				<label
					htmlFor={inputId}
					className={twMerge(
						'flex w-fit cursor-pointer items-center gap-2 select-none',
						disabled && 'pointer-events-none opacity-50'
					)}
				>
					<div className='relative h-5 w-5 shrink-0'>
						<input
							ref={ref}
							type='checkbox'
							id={inputId}
							disabled={disabled}
							className='peer sr-only'
							{...props}
						/>
						<div
							className={twMerge(
								'bg-background trs pointer-events-none h-5 w-5 rounded border-2',
								'peer-checked:border-accent peer-checked:bg-accent',
								'peer-focus-visible:ring-accent peer-focus-visible:ring-offset-background peer-focus-visible:ring-2 peer-focus-visible:ring-offset-1',
								error ? 'border-error' : 'border-gray-600'
							)}
						/>
						<BsCheckLg className='trs pointer-events-none absolute inset-0 h-5 w-5 p-0.5 text-white opacity-0 peer-checked:opacity-100' />
					</div>
					{label && <span className='text-text text-sm'>{label}</span>}
				</label>
				{error?.message && (
					<Typography variant='error' as='small'>
						{error.message}
					</Typography>
				)}
			</div>
		);
	}
);
