import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
	let { url, method, ...body } = await request.json();
	return await fetch(url, {
		method: method,
		headers: [["Content-Type", "application/json"]],
		body: ["GET", "HEAD"].includes(method) ? undefined : JSON.stringify(body),
	});
};
