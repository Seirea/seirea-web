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


export const formatAeriesDate = (dateStr: string | null) : string => {
	let lastUpdated;
	if ((lastUpdated = dateStr))
		lastUpdated = new Date(parseInt(lastUpdated.substring(6, lastUpdated.length - 2))).toLocaleString();
	else lastUpdated = "Not Yet Updated";
	return lastUpdated
}