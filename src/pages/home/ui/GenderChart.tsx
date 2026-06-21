import { useTranslation } from 'react-i18next';

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

import type { IProductStats } from '@/entities/product';

import { ChartCard } from '@/shared/ui';

import { CHART_PALETTE, tooltipContentStyle } from '../lib/chart';

type GenderChartProps = {
	title: string;
	data: IProductStats['by_gender'];
};

export const GenderChart = ({ title, data }: GenderChartProps) => {
	const { t } = useTranslation();

	const chartData = [
		{ name: t('enums.gender.male'), value: data.male },
		{ name: t('enums.gender.female'), value: data.female }
	];

	return (
		<ChartCard title={title}>
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
