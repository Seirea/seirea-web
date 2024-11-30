import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
	let { url, ...body } = await request.json();
	return await fetch(url, {
		method: "POST",
		headers: [["Content-Type", "application/json"]],
		body: JSON.stringify(body),
	});
};
