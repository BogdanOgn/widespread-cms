import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { deleteProduct, productsQuery } from '@/entities/product';
import { productKeys } from '@/entities/product/api';

export const useProducts = () => useQuery(productsQuery());

export const useDeleteProduct = () => {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: deleteProduct,
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: productKeys.lists() });
		}
	});
};
