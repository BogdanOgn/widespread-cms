import { queryOptions } from '@tanstack/react-query';

import { getBrands } from './brandApi';
import { brandKeys } from './queryKeys';

export const brandsQuery = queryOptions({
	queryKey: brandKeys.all,
	queryFn: getBrands
});
