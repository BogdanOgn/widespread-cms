import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import type { IProductStatsPriceBucket } from '@/entities/product';

import { ChartCard } from '@/shared/ui';

import { CHART_COLORS, tooltipContentStyle } from '../lib/chart';

type PriceHistogramProps = {
	data: IProductStatsPriceBucket[];
};

const bucketLabel = (bucket: IProductStatsPriceBucket) =>
	bucket.to === null ? `$${bucket.from}+` : `$${bucket.from}–${bucket.to}`;

export const PriceHistogram = ({ data }: PriceHistogramProps) => {
	const chartData = data.map(bucket => ({ label: bucketLabel(bucket), count: bucket.count }));

	return (
		<ChartCard title='Price distribution'>
			<ResponsiveContainer width='100%' height='100%'>
				<BarChart data={chartData} margin={{ left: 0, right: 16 }}>
					<CartesianGrid vertical={false} stroke={CHART_COLORS.grid} />
					<XAxis dataKey='label' stroke={CHART_COLORS.axis} tick={{ fontSize: 12 }} />
					<YAxis stroke={CHART_COLORS.axis} allowDecimals={false} />
					<Tooltip contentStyle={tooltipContentStyle} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
					<Bar dataKey='count' fill={CHART_COLORS.success} radius={[4, 4, 0, 0]} />
				</BarChart>
			</ResponsiveContainer>
		</ChartCard>
	);
};
