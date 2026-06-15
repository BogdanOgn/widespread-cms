import { useProductsStats } from '@/features/product';

import { Spinner, StatCard, Typography } from '@/shared/ui';

import { AttributeBarChart } from './AttributeBarChart';
import { GenderChart } from './GenderChart';
import { PriceHistogram } from './PriceHistogram';

export const HomePage = () => {
	const { data: stats, isPending, isError, isFetching } = useProductsStats();

	if (isPending) {
		return (
			<main className='flex h-full items-center justify-center p-5'>
				<div className='flex items-center gap-4'>
					<Spinner />
					<Typography variant='body'>Loading dashboard…</Typography>
				</div>
			</main>
		);
	}

	if (isError || !stats) {
		return (
			<main className='flex h-full items-center justify-center p-5'>
				<Typography variant='error'>Failed to load dashboard stats.</Typography>
			</main>
		);
	}

	const formatPrice = (value: number) => `$${value.toFixed(2)}`;

	return (
		<main className='relative flex flex-col gap-5 p-5'>
			{isFetching && (
				<div className='flex-center absolute inset-0 z-10 m-auto flex backdrop-blur-sm'>
					<Spinner />
				</div>
			)}
			<div className='bg-surface shadow-primary rounded-2xl p-5'>
				<Typography variant='h1' as='h1'>
					Home Dashboard
				</Typography>
			</div>

			<div className='grid grid-cols-2 gap-5 lg:grid-cols-4'>
				<StatCard label='Total products' value={stats.total} accent='accent' />
				<StatCard label='Published' value={stats.published} accent='success' />
				<StatCard label='Drafts' value={stats.drafts} />
				<StatCard label='Archived' value={stats.archived} accent='error' />
				<StatCard label='On sale' value={stats.on_sale} />
				<StatCard label='Min price' value={formatPrice(stats.price.min)} />
				<StatCard label='Avg price' value={formatPrice(stats.price.avg)} />
				<StatCard label='Max price' value={formatPrice(stats.price.max)} />
			</div>

			<div className='grid grid-cols-1 gap-5 lg:grid-cols-3'>
				<GenderChart data={stats.by_gender} />
				<AttributeBarChart
					title='Top categories'
					data={stats.by_category}
					className='lg:col-span-2'
				/>
			</div>

			<div className='grid grid-cols-1 gap-5 lg:grid-cols-2'>
				<AttributeBarChart title='Top brands' data={stats.by_brand} />
				<PriceHistogram data={stats.price_buckets} />
			</div>
		</main>
	);
};
