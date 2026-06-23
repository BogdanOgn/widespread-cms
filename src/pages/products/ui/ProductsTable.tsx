import { useNavigate, useSearch } from '@tanstack/react-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BsGenderFemale, BsGenderMale, BsPencil, BsTrash } from 'react-icons/bs';

import { useBrands } from '@/features/brand';
import { useCategories } from '@/features/category';
import { useBulkPublishProducts, useProducts } from '@/features/product';
import { useSizes } from '@/features/size';

import type { IProduct, IProductsSearch } from '@/entities/product';

import { API_URL } from '@/shared/config';
import { useLanguage } from '@/shared/i18n';
import { stripHtml } from '@/shared/lib';
import {
	Badge,
	Button,
	Checkbox,
	Pagination,
	Spinner,
	Typography,
	useOpenModal
} from '@/shared/ui';

export const ProductsTable = () => {
	const { t } = useTranslation();
	const { language } = useLanguage();
	const search = useSearch({ strict: false }) as IProductsSearch;
	const { page = 1, page_size = 10 } = search;
	const navigate = useNavigate();
	const {
		data: products,
		isPending,
		isFetching
	} = useProducts({
		page,
		page_size,
		search: search.search,
		category_id: search.category_id,
		brand_id: search.brand_id,
		gender: search.gender,
		is_published: search.is_published,
		is_archived: search.is_archived,
		min_price: search.min_price,
		max_price: search.max_price,
		size_ids: search.size_ids,
		sort_by: search.sort_by,
		order: search.order
	});
	const openModal = useOpenModal();

	const { mutate: bulkPublish, isPending: isPublishing } = useBulkPublishProducts();

	const { data: brands = [] } = useBrands();
	const { data: categories = [] } = useCategories();
	const { data: sizes = [] } = useSizes();

	const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

	const pageItems: IProduct[] = products?.items ?? [];
	const allPageSelected = pageItems.length > 0 && pageItems.every(p => selectedIds.has(p.id));

	const toggleSelectAll = () => {
		if (allPageSelected) {
			setSelectedIds(prev => {
				const next = new Set(prev);
				pageItems.forEach(p => next.delete(p.id));
				return next;
			});
		} else {
			setSelectedIds(prev => {
				const next = new Set(prev);
				console.log(next);
				pageItems.forEach(p => next.add(p.id));
				return next;
			});
		}
	};

	const toggleSelect = (id: number) => {
		setSelectedIds(prev => {
			const next = new Set(prev);

			if (next.has(id)) {
				next.delete(id);
			} else {
				next.add(id);
			}
			return next;
		});
	};

	const selectedProducts = pageItems.filter(p => selectedIds.has(p.id));
	const selectedCount = selectedIds.size;

	const handlePageChange = (newPage: number) => {
		setSelectedIds(new Set());

		navigate({ to: '.', search: prev => ({ ...prev, page: newPage, page_size }) });
	};

	const handleOpenDeleteProductModal = (productId: number) => {
		openModal('deleteProduct', { productId });
	};

	const handleOpenUpdateProductModal = (productId: number) => {
		openModal('updateProduct', { productId, brands, categories, sizes });
	};

	const handleBulkDelete = () => {
		openModal('bulkDeleteProducts', {
			productIds: Array.from(selectedIds),
			onSuccess: () => setSelectedIds(new Set())
		});
	};

	const handleBulkPublish = (is_published: boolean) => {
		bulkPublish(
			{ products: selectedProducts, is_published },
			{ onSuccess: () => setSelectedIds(new Set()) }
		);
	};

	if (isPending) {
		return (
			<div className='bg-surface shadow-primary flex-center flex flex-1 rounded-2xl p-5'>
				<div className='flex gap-4'>
					<Spinner />
					<Typography variant='body'>{t('products.loading')}</Typography>
				</div>
			</div>
		);
	}
	if (!products?.items.length) {
		return (
			<div className='bg-surface shadow-primary flex-center flex h-full flex-1 rounded-2xl p-5'>
				<Typography variant='body'>{t('products.noFound')}</Typography>
			</div>
		);
	}

	return (
		<div className='bg-surface shadow-primary relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl'>
			{isFetching && (
				<div className='flex-center absolute inset-0 z-10 m-auto flex backdrop-blur-sm'>
					<Spinner />
				</div>
			)}

			{selectedCount > 0 && (
				<div className='flex items-center gap-3 border-b border-gray-100 px-5 py-3'>
					<Typography variant='body' className='text-gray-500'>
						{selectedCount} {t('products.selected')}
					</Typography>
					<div className='ml-auto flex gap-2'>
						<Button
							size='sm'
							variant='secondary'
							onClick={() => handleBulkPublish(true)}
							disabled={isPublishing}
						>
							{isPublishing ? <Spinner size='sm' /> : 'Publish'}
						</Button>
						<Button
							size='sm'
							variant='secondary'
							onClick={() => handleBulkPublish(false)}
							disabled={isPublishing}
						>
							{isPublishing ? <Spinner size='sm' /> : 'Unpublish'}
						</Button>
						<Button size='sm' variant='danger' onClick={handleBulkDelete}>
							Delete
						</Button>
					</div>
				</div>
			)}

			<div className='min-h-0 flex-1 overflow-auto'>
				<table className='w-full table-fixed border-separate border-spacing-0 text-left'>
					<thead className='sticky top-0 z-10'>
						<tr className='[&>th]:bg-surface [&>th]:border-b [&>th]:border-gray-100'>
							<th className='w-16 px-5 py-3'>
								<Checkbox checked={allPageSelected} onChange={toggleSelectAll} />
							</th>
							<th className='typography-caption w-16 px-5 py-3 font-medium text-gray-500'>ID</th>
							<th className='typography-caption w-50 px-5 py-3 font-medium text-gray-500'>
								{t('products.name')}
							</th>
							<th className='typography-caption w-22 px-5 py-3 font-medium text-gray-500'>
								{t('products.images')}
							</th>
							<th className='typography-caption w-80 px-5 py-3 font-medium text-gray-500'>
								{t('products.description')}
							</th>
							<th className='typography-caption w-30 px-5 py-3 font-medium text-gray-500'>
								{t('products.price')}
							</th>
							<th className='typography-caption w-30 px-5 py-3 font-medium text-gray-500'>
								{t('products.brand')}
							</th>
							<th className='typography-caption w-30 px-5 py-3 font-medium text-gray-500'>
								{t('products.category')}
							</th>
							<th className='typography-caption w-30 px-5 py-3 font-medium text-gray-500'>
								{t('products.gender')}
							</th>
							<th className='typography-caption w-30 px-5 py-3 font-medium text-gray-500'>
								{t('products.published')}
							</th>
							<th className='typography-caption w-37.5 px-5 py-3 font-medium text-gray-500'>
								{t('products.sizes')}
							</th>
							<th className='w-37.5 px-5 py-3' />
						</tr>
					</thead>
					<tbody>
						{products.items.map(product => {
							const isMale = product.gender === 'male';
							const GenderIcon = isMale ? BsGenderMale : BsGenderFemale;
							const mainImage = product.images?.find(image => image.order === 0);
							const isSelected = selectedIds.has(product.id);

							return (
								<tr
									key={product.id}
									className={`[&>td]:border-b [&>td]:border-gray-100 last:[&>td]:border-0 ${isSelected ? 'bg-accent/5' : ''}`}
								>
									<td className='px-5 py-3'>
										<Checkbox checked={isSelected} onChange={() => toggleSelect(product.id)} />
									</td>
									<td className='typography-body-md px-5 py-3'>{product.id}</td>
									<td className='typography-body-md px-5 py-3'>{product.title}</td>
									<td className='typography-body-md px-5 py-3'>
										{product.images && (
											<div className='bg-gray h-12 w-12 overflow-hidden rounded-sm'>
												<img
													src={mainImage ? `${API_URL}${mainImage.url}` : 'nophoto.png'}
													alt='product image'
													className='h-full w-full object-cover'
												/>
											</div>
										)}
									</td>
									<td className='typography-body-md px-5 py-3 text-gray-500'>
										<div className='line-clamp-1'>{stripHtml(product.description)}</div>
									</td>
									<td className='typography-body-md px-5 py-3'>
										${Number(product.price).toFixed(2)}
									</td>
									<td className='typography-body-md px-5 py-3'>{product.brand?.name ?? '-'}</td>
									<td className='typography-body-md px-5 py-3'>{product.category?.name ?? '-'}</td>
									<td className='typography-body-md px-5 py-3'>
										<div
											className={`${isMale ? 'text-accent' : 'text-error'} flex-center flex gap-2`}
										>
											<GenderIcon className='min min-w-4' />
											{product.gender_label}
										</div>
									</td>
									<td className='typography-body-md px-5 py-3'>
										{product.is_published ? (
											<Badge variant='success'> {language === 'en' ? 'Yes' : 'Да'} </Badge>
										) : (
											<Badge variant='error'>{language === 'en' ? 'No' : 'Нет'}</Badge>
										)}
									</td>
									<td className='typography-body-md px-5 py-3'>
										<div className='flex flex-wrap gap-2'>
											{product.sizes.map(size => (
												<Badge key={size.id}>{size.name}</Badge>
											))}
										</div>
									</td>
									<td className='px-5 py-3'>
										<div className='flex items-center justify-end gap-2'>
											<Button
												className='hover:text-accent-hover text-yellow-300'
												variant='ghost'
												size='md'
												onClick={() => handleOpenUpdateProductModal(product.id)}
											>
												<BsPencil />
											</Button>
											<Button
												variant='ghost'
												size='md'
												className='text-error hover:text-error-hover'
												onClick={() => handleOpenDeleteProductModal(product.id)}
											>
												<BsTrash />
											</Button>
										</div>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>

			<Pagination
				page={products.page}
				pages={products.pages}
				onChange={handlePageChange}
				className='mt-auto'
			/>
		</div>
	);
};
