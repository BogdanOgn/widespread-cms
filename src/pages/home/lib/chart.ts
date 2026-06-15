export const CHART_COLORS = {
	accent: '#3b82f6',
	success: '#22c55e',
	error: '#ef4444',
	grid: '#2a2a2a',
	axis: '#9ca3af',
	tooltipBg: '#1e1e1e'
} as const;

export const CHART_PALETTE = ['#3b82f6', '#ef4444', '#22c55e'] as const;

export const tooltipContentStyle = {
	backgroundColor: CHART_COLORS.tooltipBg,
	border: `1px solid ${CHART_COLORS.grid}`,
	borderRadius: 8,
	color: '#e5e7eb'
} as const;
