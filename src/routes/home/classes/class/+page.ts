import type { PageLoad } from "./$types";
import type { TermCode } from "$lib/api-types";

export const load: PageLoad = async ({ url }) => {
	let classId = url.searchParams.get("classId");
	let termCode = url.searchParams.get("term") as TermCode;

	return { classId: classId ? parseInt(classId) : null, termCode };
};
