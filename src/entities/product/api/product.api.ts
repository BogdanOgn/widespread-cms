import {
	type IProduct,
	type IProductCreate,
	type IProductFilters,
	type IProductResponse,
	type IProductStats,
	type IProductStatsResponse
} from '@/entities/product';

import { httpClient } from '@/shared/api';

export const getProduct = (productId: number) =>
	httpClient.get<IProduct>(`/products/get_product/${productId}`).then(r => r.data);

export const getProducts = (filters: IProductFilters = {}) => {
	const params = new URLSearchParams();
	const { size_ids, ...rest } = filters;

	Object.entries(rest).forEach(([key, value]) => {
		if (value !== undefined && value !== null && value !== '') {
			params.append(key, String(value));
		}
	});

	size_ids?.forEach(id => params.append('size_ids', String(id)));

	return httpClient
		.get<IProductResponse>(`/products/get_products?${params.toString()}`)
		.then(r => r.data);
};

const normalizeStats = (raw: IProductStatsResponse): IProductStats => ({
	...raw,
	price: {
		min: Number(raw.price.min),
		max: Number(raw.price.max),
		avg: Number(raw.price.avg)
	},
	price_buckets: raw.price_buckets.map(bucket => ({
		from: Number(bucket.from),
		to: bucket.to === null ? null : Number(bucket.to),
		count: bucket.count
	}))
});

export const getProductsStats = () =>
	httpClient.get<IProductStatsResponse>('/products/stats').then(r => normalizeStats(r.data));

export const createProduct = (data: IProductCreate) =>
	httpClient.post<IProduct>('/products/create_product', data).then(r => r.data);

export const deleteProduct = (id: number) => httpClient.delete(`/products/delete_product/${id}`);

export const updateProduct = (id: number, data: IProductCreate) =>
	httpClient.patch<IProduct>(`/products/update_product/${id}`, data).then(r => r.data);
