import type { FieldErrors } from 'react-hook-form';
import Select, {
	type ActionMeta,
	type InputActionMeta,
	type MultiValue,
	type PropsValue,
	type SingleValue
} from 'react-select';

export type Option<T extends string | number = string> = {
	label: string | number;
	value: T;
};

type SelectProps<T extends string | number = string> = {
	options: Option<T>[];
	placeholder: string;
	name: string;
	defaultValue?: Option<T>;
	value?: SingleValue<Option<T>> | MultiValue<Option<T>> | PropsValue<Option<T>>;
	onChange?: (
		newValue: SingleValue<Option<T>> | MultiValue<Option<T>>,
		actionMeta: ActionMeta<Option<T>>
	) => void;
	errors?: FieldErrors;
	onInputChange?: (newValue: string, actionMeta: InputActionMeta) => void;
	isMulti?: boolean;
};

export const Selector = <T extends string | number = string>({
	options,
	placeholder,
	name,
	defaultValue,
	value,
	onChange,
	onInputChange,
	isMulti = false
}: SelectProps<T>) => {
	return (
		<Select
			unstyled
			onInputChange={onInputChange}
			isClearable={false}
			isMulti={isMulti}
			onChange={onChange}
			placeholder={placeholder}
			name={name}
			defaultValue={defaultValue}
			options={options}
			classNamePrefix='select'
			classNames={{
				control: () =>
					'h-12 border-none rounded-md text-red px-4 bg-background cursor-pointer shadow-primary',
				menu: () => 'mt-1 bg-background shadow-primary overflow-hidden rounded-md shadow-lg z-50',
				option: ({ isSelected }) =>
					`px-3 py-2 cursor-pointer trs hover:bg-accent-hover ${isSelected && 'bg-accent text-white'}`,
				placeholder: () => 'text-gray-400',
				singleValue: () => 'text-white ',
				multiValue: () => 'text-white bg-surface shadow-primary px-3 rounded-[4px] flex gap-2 mr-2',
				input: () => 'text-white text-red cursor-pointer',
				noOptionsMessage: () => 'text-gray-500 px-3 py-2'
			}}
			styles={{
				option: () => ({ cursor: 'pointer' }),
				control: () => ({ cursor: 'pointer', display: 'flex', justifyContent: 'space-between' })
			}}
			value={value}
		/>
	);
};
