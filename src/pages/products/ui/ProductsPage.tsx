import { ResourceLayout } from '@/widgets/resource-layout';

import { Button, useOpenModal } from '@/shared/ui';

import { ProductsTable } from './ProductsTable';

export const ProductsPage = () => {
	const openModal = useOpenModal();

	const handleOpenCreateProductModal = () => {
		openModal('createProduct');
	};

	return (
		<main className='p-5'>
			<ResourceLayout
				title='Products'
				actions={
					<Button size='sm' onClick={handleOpenCreateProductModal}>
						Add product
					</Button>
				}
			>
				<ProductsTable />
			</ResourceLayout>
		</main>
	);
};
