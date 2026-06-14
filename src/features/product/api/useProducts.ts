import { useQuery } from '@tanstack/react-query';

import { type IProductFilters, productQueries } from '@/entities/product';

export const useProducts = (filters: IProductFilters = {}) =>
	useQuery(productQueries.list(filters));
