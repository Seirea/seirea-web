import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ url }) => {
	let classId = url.searchParams.get("classId");
	let termCode = url.searchParams.get("term");

	return { classId: classId ? parseInt(classId) : null, termCode };
};
