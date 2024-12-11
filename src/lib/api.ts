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
			username
		);

		let resp = await fetch(this.genRequest("POST", "/authentication", authData));

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

	genRequest(method: string, url: URL | string, body?: object): Request {
		let headers = new Headers();
		if (url !== "/authentication") {
			if (this.token === null) throw new UninitializedApiError();
			headers.append("Authorization", this.token);
		}
		if (body) {
			body.url = this.apiUrl + url.toString();
			body.method = method;
		} else {
			body = { url: this.apiUrl + url.toString(), method };
		}
		return new Request("/proxy", {
			headers,
			body: JSON.stringify(body),
			method: "POST",
		});
	}

	async getHomePage(): Promise<unknown> {
		if (this.student === null) throw new UninitializedApiError();
		let resp = await fetch(
			this.genRequest(
				"GET", `/student/${this.student.Demographics.StudentID}/homescreendata`
			)
		);
		let data = await resp.json();

		return data;
	}
}
