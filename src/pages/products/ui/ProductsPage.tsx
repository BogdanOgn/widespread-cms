import { useTranslation } from 'react-i18next';

import { ResourceLayout } from '@/widgets/resource-layout';

import { useBrands } from '@/features/brand';
import { useCategories } from '@/features/category';
import { ProductsFilters } from '@/features/product';
import { useSizes } from '@/features/size';

import { Button, useOpenModal } from '@/shared/ui';

import { ProductsTable } from './ProductsTable';

export const ProductsPage = () => {
	const { t } = useTranslation();

	const openModal = useOpenModal();
	const { data: brands = [] } = useBrands();
	const { data: categories = [] } = useCategories();
	const { data: sizes = [] } = useSizes();

	const handleOpenCreateProductModal = () => {
		openModal('createProduct', { brands, categories, sizes });
	};

	return (
		<main className='h-full max-h-screen min-h-0 overflow-hidden p-5'>
			<ResourceLayout
				title={t('products.title')}
				actions={
					<Button size='sm' onClick={handleOpenCreateProductModal}>
						{t('products.addProduct')}
					</Button>
				}
				filters={<ProductsFilters />}
			>
				<ProductsTable />
			</ResourceLayout>
		</main>
	);
};
