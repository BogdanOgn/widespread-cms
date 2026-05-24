import { useQuery } from '@tanstack/react-query';

import { brandsQuery } from '@/entities/brand';

export const useBrands = () => useQuery(brandsQuery);
