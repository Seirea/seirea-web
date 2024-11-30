import {
	type Address,
	type Assignment,
	type AuthResponseData,
	type Demographics,
	type PasswordRequirement,
	type PasswordRule,
	type Student,
	type View,
	AuthRequestData,
	isFail,
} from "./api-types";

import { generateKeyFromTimestamp, getTimeFormatted } from "./auth/keygen";

export class UninitializedApiError extends Error {
	constructor() {
		super("AeriesApi was not initialized");
		this.name = "UninitializedApiError";
	}
}

export class AeriesApi {
	public apiUrl: URL;
	private token: string | null;
	private student: Student | null;
	constructor(apiUrl: URL) {
		this.apiUrl = apiUrl;
		this.token = null;
		this.student = null;
	}

	// return true if able to authenticate
	async authenticate(username: string, password: string): Promise<Boolean> {
		/* assume it sets `student` & `token` */
		const timestamp = getTimeFormatted();
		const secretKey = await generateKeyFromTimestamp(getTimeFormatted());
		let authData = new AuthRequestData(
			secretKey,
			timestamp,
			password,
			username,
			new URL(`${this.apiUrl}/authentication`)
		);

		let resp = await fetch(`/proxy`, {
			method: "POST",
			body: JSON.stringify(authData),
		});

		if (!resp.ok) {
			return false;
		}

		let data = (await resp.json()) as AuthResponseData;
		console.log(data);

		if (isFail(data)) {
			console.log("fail!");
			return false;
		} else {
			console.log("success");
			this.token = data.AccessToken;
			this.student = data.Students[0];
			return true;
		}
	}

	genRequest(url: URL | string, body?: BodyInit): Request {
		let headers = new Headers();
		if (this.token === null) throw new UninitializedApiError();
		headers.append("Authorization", this.token);
		return new Request(url, {
			headers,
			body,
			method: "GET",
		});
	}

	async getHomePage(): Promise<unknown> {
		if (this.student === null) throw new UninitializedApiError();
		let resp = await fetch(
			this.genRequest(
				`${this.apiUrl}/student/${this.student.Demographics.StudentID}`
			)
		);
		let data = await resp.json();

		return data;
	}
}
