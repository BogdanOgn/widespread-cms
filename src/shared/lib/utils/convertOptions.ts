export const convertOptions = <T extends { id: number; name: string }>(items: T[]) => {
	return items.map(item => ({
		label: item.name,
		value: item.id
	}));
};
