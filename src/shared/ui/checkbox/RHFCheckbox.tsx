import type { ComponentProps } from 'react';
import {
	type Control,
	type FieldValues,
	type Path,
	type RegisterOptions,
	useController
} from 'react-hook-form';

import { Checkbox } from './Checkbox';

type BaseCheckboxProps = ComponentProps<typeof Checkbox>;

type RHFCheckboxProps<TFieldValues extends FieldValues> = Omit<
	BaseCheckboxProps,
	'name' | 'checked' | 'defaultChecked' | 'onChange' | 'onBlur'
> & {
	name: Path<TFieldValues>;
	control: Control<TFieldValues>;
	rules?: RegisterOptions<TFieldValues>;
};

export const RHFCheckbox = <TFieldValues extends FieldValues>({
	control,
	name,
	rules,
	...props
}: RHFCheckboxProps<TFieldValues>) => {
	const { field, fieldState } = useController({ name, control, rules });

	return (
		<Checkbox
			ref={field.ref}
			name={field.name}
			checked={!!field.value}
			onChange={field.onChange}
			onBlur={field.onBlur}
			error={fieldState.error}
			{...props}
		/>
	);
};
