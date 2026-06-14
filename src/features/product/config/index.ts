import { type Option } from '@/shared/ui';

export const GENDER_OPTIONS: Option[] = [
	{ value: 'male', label: 'Male' },
	{ value: 'female', label: 'Female' }
];

export const FILTER_GENDER_OPTIONS: Option<string>[] = [
	{ label: 'All genders', value: '' },
	{ label: 'Male', value: 'male' },
	{ label: 'Female', value: 'female' }
];

export const FILTER_BOOL_OPTIONS: Option<string>[] = [
	{ label: 'All', value: '' },
	{ label: 'Yes', value: 'true' },
	{ label: 'No', value: 'false' }
];

export const FILTER_SORT_OPTIONS: Option<string>[] = [
	{ label: 'ID', value: 'id' },
	{ label: 'Title', value: 'title' },
	{ label: 'Price', value: 'price' }
];

export const FILTER_ORDER_OPTIONS: Option<string>[] = [
	{ label: 'Ascending', value: 'asc' },
	{ label: 'Descending', value: 'desc' }
];
