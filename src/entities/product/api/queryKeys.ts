export const productKeys = {
	all: ['products'] as const,
	lists: () => [...productKeys.all, 'list'] as const,
	list: (pageSize: number, page: number) => [...productKeys.lists(), pageSize, page] as const,
};
