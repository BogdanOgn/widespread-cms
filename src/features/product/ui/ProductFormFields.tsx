import { Controller } from 'react-hook-form';
import type { Control } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type { MultiValue, SingleValue } from 'react-select';

import type { PendingImage } from '@/entities/image';

import type { Option } from '@/shared/ui';
import { RHFCheckbox, RHFInput, RHFRichTextEditor, Selector } from '@/shared/ui';

import type { CreateProductFormValues } from '../lib';

import { ProductImageUpload } from './ProductImageUpload';

type Props = {
	control: Control<CreateProductFormValues>;
	convertedBrands: Option<number>[];
	convertedCategories: Option<number>[];
	convertedSizes: Option<number>[];
	images: PendingImage[];
	onImagesChange: (images: PendingImage[]) => void;
};

export const ProductFormFields = ({
	control,
	convertedBrands,
	convertedCategories,
	convertedSizes,
	images,
	onImagesChange
}: Props) => {
	const { t } = useTranslation();

	const genderOptions: Option[] = [
		{ value: 'male', label: t('enums.gender.male') },
		{ value: 'female', label: t('enums.gender.female') }
	];

	return (
		<div className='mb-10 flex flex-col gap-5'>
			<RHFInput
				name='title'
				hint={t('products.form.title')}
				placeholder={t('products.form.titlePlaceholder')}
				control={control}
			/>
			<RHFInput name='slug' hint={t('products.form.slug')} control={control} readOnly />
			<RHFInput
				name='price'
				hint={t('products.form.price')}
				placeholder={t('products.form.pricePlaceholder')}
				control={control}
				mask={Number}
			/>
			<Controller
				name='gender'
				control={control}
				render={({ field: { value, onChange }, fieldState }) => (
					<Selector
						name='gender'
						hint={t('products.form.gender')}
						placeholder={t('products.form.genderPlaceholder')}
						options={genderOptions}
						value={genderOptions.find(option => option.value === value)}
						onChange={option => onChange((option as SingleValue<Option>)?.value)}
						error={fieldState.error}
					/>
				)}
			/>
			<Controller
				name='brand_id'
				control={control}
				render={({ field: { value, onChange }, fieldState }) => (
					<Selector
						name='brand_id'
						hint={t('products.form.brand')}
						placeholder={t('products.form.brandPlaceholder')}
						options={convertedBrands}
						value={convertedBrands.find(option => option.value === value)}
						onChange={option => onChange((option as SingleValue<Option<number>>)?.value)}
						error={fieldState.error}
					/>
				)}
			/>
			<Controller
				name='category_id'
				control={control}
				render={({ field, fieldState }) => (
					<Selector
						name='category_id'
						hint={t('products.form.category')}
						placeholder={t('products.form.categoryPlaceholder')}
						options={convertedCategories}
						value={convertedCategories.find(option => option.value === field.value)}
						onChange={option => field.onChange((option as SingleValue<Option<number>>)?.value)}
						error={fieldState.error}
					/>
				)}
			/>
			<Controller
				name='size_ids'
				control={control}
				render={({ field: { value, onChange }, fieldState }) => (
					<Selector
						name='size_ids'
						hint={t('products.form.sizes')}
						placeholder={t('products.form.sizesPlaceholder')}
						isMulti
						options={convertedSizes}
						value={convertedSizes.filter(option => value?.includes(option.value))}
						onChange={option => onChange((option as MultiValue<Option<number>>).map(o => o.value))}
						error={fieldState.error}
					/>
				)}
			/>
			<RHFRichTextEditor
				name='description'
				hint={t('products.form.description')}
				control={control}
			/>

			<RHFCheckbox name='is_published' control={control} label={t('products.form.publish')} />
			<ProductImageUpload images={images} onChange={onImagesChange} />
		</div>
	);
};
