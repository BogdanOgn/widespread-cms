export const toNumber = (value: unknown): number | undefined => {
	const num = Number(value);
	return value !== undefined && value !== '' && Number.isFinite(num) ? num : undefined;
};
