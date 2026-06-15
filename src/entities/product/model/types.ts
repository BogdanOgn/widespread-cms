import type { AttributeItem } from '@/shared/model';

type ProductImage = {
	id: number;
	product_id: number;
	url: string;
	alt?: string;
	order: number;
};

export interface IProduct {
	id: number;
	title: string;
	description: string;
	brand: AttributeItem;
	brand_id: number;
	price: number;
	sale_price?: number;
	slug: string;
	gender: 'male' | 'female';
	is_published: boolean;
	is_archived: boolean;
	category: AttributeItem;
	category_id: number;
	sizes: AttributeItem[];
	images?: ProductImage[];
}

export interface IProductCreate {
	title: string;
	description: string;
	brand_id: number;
	price: number;
	sale_price?: number;
	slug: string;
	gender: 'male' | 'female';
	is_published: boolean;
	is_archived: boolean;
	category_id: number;
	size_ids: number[];
}

export interface IProductResponse {
	items: IProduct[];
	total: number;
	page: number;
	page_size: number;
	pages: number;
}

export type ProductSortBy = 'id' | 'title' | 'price';
export type ProductOrder = 'asc' | 'desc';

export interface IProductFilters {
	search?: string;
	category_id?: number;
	brand_id?: number;
	gender?: 'male' | 'female';
	is_published?: boolean;
	is_archived?: boolean;
	min_price?: number;
	max_price?: number;
	size_ids?: number[];
	sort_by?: ProductSortBy;
	order?: ProductOrder;
	page?: number;
	page_size?: number;
}

export type IProductsSearch = Omit<IProductFilters, 'page_size'> & {
	page: number;
	page_size: number;
};

export interface IProductStatsAttribute {
	id: number;
	name: string;
	count: number;
}

export interface IProductStatsPriceBucket {
	from: number;
	to: number | null;
	count: number;
}

type Price = {
	min: number;
	max: number;
	avg: number;
};

type Gender = {
	male: number;
	female: number;
};

export interface IProductStats {
	total: number;
	published: number;
	archived: number;
	drafts: number;
	on_sale: number;
	price: Price;
	by_category: IProductStatsAttribute[];
	by_brand: IProductStatsAttribute[];
	by_gender: Gender;
	price_buckets: IProductStatsPriceBucket[];
}

export interface IProductStatsResponse extends Omit<IProductStats, 'price' | 'price_buckets'> {
	price: Price;
	price_buckets: Array<{
		from: string;
		to: string | null;
		count: number;
	}>;
}
