import type { ComponentProps } from 'react';
import type { Control, FieldValues, Path, RegisterOptions } from 'react-hook-form';
import { useController } from 'react-hook-form';

import { RichTextEditor } from './RichTextEditor';

type BaseProps = ComponentProps<typeof RichTextEditor>;

type RHFRichTextEditorProps<TFieldValues extends FieldValues> = Omit<
	BaseProps,
	'value' | 'onChange' | 'onBlur' | 'error'
> & {
	name: Path<TFieldValues>;
	control: Control<TFieldValues>;
	rules?: RegisterOptions<TFieldValues>;
};

export const RHFRichTextEditor = <TFieldValues extends FieldValues>({
	control,
	name,
	rules,
	...props
}: RHFRichTextEditorProps<TFieldValues>) => {
	const { field, fieldState } = useController({ name, control, rules });

	return (
		<RichTextEditor
			{...props}
			value={field.value ?? ''}
			onChange={field.onChange}
			onBlur={field.onBlur}
			error={fieldState.error}
		/>
	);
};
