import { queryOptions } from '@tanstack/react-query';

import { getProducts } from './productApi';
import { productKeys } from './queryKeys';

export const productsQuery = (pageSize: number = 10, page: number = 1) =>
	queryOptions({
		queryKey: productKeys.list(pageSize, page),
		queryFn: () => getProducts(pageSize, page)
	});
