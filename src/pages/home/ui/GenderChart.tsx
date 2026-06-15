import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

import type { IProductStats } from '@/entities/product';

import { ChartCard } from '@/shared/ui';

import { CHART_PALETTE, tooltipContentStyle } from '../lib/chart';

type GenderChartProps = {
	data: IProductStats['by_gender'];
};

export const GenderChart = ({ data }: GenderChartProps) => {
	const chartData = [
		{ name: 'Male', value: data.male },
		{ name: 'Female', value: data.female }
	];

	return (
		<ChartCard title='By gender'>
			<ResponsiveContainer width='100%' height='100%'>
				<PieChart>
					<Pie
						data={chartData}
						dataKey='value'
						nameKey='name'
						innerRadius={60}
						outerRadius={90}
						paddingAngle={2}
					>
						{chartData.map((entry, index) => (
							<Cell key={entry.name} fill={CHART_PALETTE[index % CHART_PALETTE.length]} />
						))}
					</Pie>
					<Tooltip contentStyle={tooltipContentStyle} />
					<Legend />
				</PieChart>
			</ResponsiveContainer>
		</ChartCard>
	);
};
