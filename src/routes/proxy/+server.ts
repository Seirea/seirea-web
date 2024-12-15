import { text } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
	let { url, method, headers, ...body } = await request.json();
	headers["Content-Type"] = "application/json";
	return await fetch(url, {
		method: method,
		headers,
		body: ["GET", "HEAD"].includes(method.toUpperCase()) ? undefined : JSON.stringify(body),
	});
};

export const fallback: RequestHandler = async ({ request }) => {
	return text(`I caught your ${request.method} request!`);
};
