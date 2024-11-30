import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
	let { url, ...body } = await request.json();
	console.log(body);
	return await fetch(url, {
		method: "POST",
		body: body,
	});
};
