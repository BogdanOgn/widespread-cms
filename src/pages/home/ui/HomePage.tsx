import { useTranslation } from 'react-i18next';

import { useProductsStats } from '@/features/product';

import { Spinner, StatCard, Typography } from '@/shared/ui';

import { AttributeBarChart } from './AttributeBarChart';
import { GenderChart } from './GenderChart';
import { PriceHistogram } from './PriceHistogram';

export const HomePage = () => {
	const { t } = useTranslation();
	const { data: stats, isPending, isError, isFetching } = useProductsStats();

	if (isPending) {
		return (
			<main className='flex h-full items-center justify-center p-5'>
				<div className='flex items-center gap-4'>
					<Spinner />
					<Typography variant='body'>{t('home.loading')}</Typography>
				</div>
			</main>
		);
	}

	if (isError || !stats) {
		return (
			<main className='flex h-full items-center justify-center p-5'>
				<Typography variant='error'>{t('home.failed')}</Typography>
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
					{t('home.title')}
				</Typography>
			</div>

			<div className='grid grid-cols-2 gap-5 lg:grid-cols-4'>
				<StatCard label={t('home.total')} value={stats.total} accent='accent' />
				<StatCard label={t('home.published')} value={stats.published} accent='success' />
				<StatCard label={t('home.drafts')} value={stats.drafts} />
				<StatCard label={t('home.archived')} value={stats.archived} accent='error' />
				<StatCard label={t('home.onSale')} value={stats.on_sale} />
				<StatCard label={t('home.minPrice')} value={formatPrice(stats.price.min)} />
				<StatCard label={t('home.avgPrice')} value={formatPrice(stats.price.avg)} />
				<StatCard label={t('home.maxPrice')} value={formatPrice(stats.price.max)} />
			</div>

			<div className='grid grid-cols-1 gap-5 lg:grid-cols-3'>
				<GenderChart title={t('home.byGender')} data={stats.by_gender} />
				<AttributeBarChart
					title={t('home.topCategories')}
					data={stats.by_category}
					className='lg:col-span-2'
				/>
			</div>

			<div className='grid grid-cols-1 gap-5 lg:grid-cols-2'>
				<AttributeBarChart title={t('home.topBrands')} data={stats.by_brand} />
				<PriceHistogram title={t('home.priceDistribution')} data={stats.price_buckets} />
			</div>
		</main>
	);
};
