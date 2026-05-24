import { useQuery } from '@tanstack/react-query';

import { categoriesQuery } from '@/entities/category';

export const useCategories = () => useQuery(categoriesQuery);
