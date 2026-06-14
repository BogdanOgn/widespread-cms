import { toBoolean, toNumber } from '@/shared/lib';

import type { IProductsSearch } from '../model/types';

export const validateProductsSearch = (search: Record<string, unknown>): IProductsSearch => {
	const result: IProductsSearch = {
		page: Number(search.page) > 0 ? Number(search.page) : 1,
		page_size: Number(search.page_size) > 0 ? Number(search.page_size) : 10
	};

	const query = typeof search.search === 'string' ? search.search.trim() : '';
	if (query) result.search = query;

	const category_id = toNumber(search.category_id);
	if (category_id) result.category_id = category_id;

	const brand_id = toNumber(search.brand_id);
	if (brand_id) result.brand_id = brand_id;

	if (search.gender === 'male' || search.gender === 'female') result.gender = search.gender;

	const is_published = toBoolean(search.is_published);
	if (is_published !== undefined) result.is_published = is_published;

	const min_price = toNumber(search.min_price);
	if (min_price !== undefined) result.min_price = min_price;

	const max_price = toNumber(search.max_price);
	if (max_price !== undefined) result.max_price = max_price;

	const sizeRaw = search.size_ids;
	const size_ids = (Array.isArray(sizeRaw) ? sizeRaw : sizeRaw != null ? [sizeRaw] : [])
		.map(toNumber)
		.filter((id): id is number => id !== undefined);
	if (size_ids.length) result.size_ids = size_ids;

	if (search.sort_by === 'id' || search.sort_by === 'title' || search.sort_by === 'price')
		result.sort_by = search.sort_by;

	if (search.order === 'asc' || search.order === 'desc') result.order = search.order;

	return result;
};
