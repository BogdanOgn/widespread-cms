import { queryOptions } from '@tanstack/react-query';

import { sizeKeys } from './queryKeys';
import { getSizes } from './sizeApi';

export const sizesQuery = queryOptions({
	queryKey: sizeKeys.all,
	queryFn: getSizes
});
