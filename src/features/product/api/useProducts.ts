import { useQuery } from '@tanstack/react-query';

import { productQueries } from '@/entities/product';

export const useProducts = (pageSize: number = 10, page: number = 1) =>
	useQuery(productQueries.list(pageSize, page));
