export const groupBy = <T>(
	arr: T[],
	grouper: (obj: T) => string
): Record<string, T[]> => {
	const finalObj: Record<string, T[]> = {};
	arr.forEach((obj) => {
		const key = grouper(obj);
		if (finalObj[key] === undefined) finalObj[key] = [obj];
		else finalObj[key].push(obj);
	});
	return finalObj;
};
