import { queryOptions } from '@tanstack/react-query';

import { getCategories } from './categoryApi';
import { categoryKeys } from './queryKeys';

export const categoriesQuery = queryOptions({
	queryKey: categoryKeys.all,
	queryFn: getCategories
});
