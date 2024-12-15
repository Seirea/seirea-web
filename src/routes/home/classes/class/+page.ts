import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ url }) => {
	let classId = url.searchParams.get("classId");

	return { classId: classId ? parseInt(classId) : null };
};
