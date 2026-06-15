import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import type { IProductStatsAttribute } from '@/entities/product';

import { ChartCard } from '@/shared/ui';

import { CHART_COLORS, tooltipContentStyle } from '../lib/chart';

type AttributeBarChartProps = {
	title: string;
	data: IProductStatsAttribute[];
	limit?: number;
	color?: string;
	className?: string;
};

export const AttributeBarChart = ({
	title,
	data,
	limit = 8,
	color = CHART_COLORS.accent,
	className
}: AttributeBarChartProps) => {
	const chartData = [...data].sort((a, b) => b.count - a.count).slice(0, limit);

	return (
		<ChartCard title={title} className={className}>
			<ResponsiveContainer width='100%' height='100%'>
				<BarChart data={chartData} layout='vertical' margin={{ left: 16, right: 16 }}>
					<CartesianGrid horizontal={false} stroke={CHART_COLORS.grid} />
					<XAxis type='number' stroke={CHART_COLORS.axis} allowDecimals={false} />
					<YAxis
						type='category'
						dataKey='name'
						stroke={CHART_COLORS.axis}
						width={100}
						tick={{ fontSize: 12 }}
					/>
					<Tooltip contentStyle={tooltipContentStyle} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
					<Bar dataKey='count' fill={color} radius={[0, 4, 4, 0]} />
				</BarChart>
			</ResponsiveContainer>
		</ChartCard>
	);
};
