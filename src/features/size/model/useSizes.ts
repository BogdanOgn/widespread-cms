import { useQuery } from '@tanstack/react-query';

import { sizesQuery } from '@/entities/size';

export const useSizes = () => useQuery(sizesQuery);
