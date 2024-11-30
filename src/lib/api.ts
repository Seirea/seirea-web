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

	async authenticate(username: string, password: string) {
		/* assume it sets `student` & `token` */
		const timestamp = getTimeFormatted();
		const secretKey = await generateKeyFromTimestamp(getTimeFormatted());
		let authData = new AuthRequestData(
			secretKey,
			timestamp,
			password,
			username
		);
		let resp = await fetch(`${this.apiUrl}/authentication`, {
			method: "POST",
			body: JSON.stringify(authData),
		});
		let data = (await resp.json()) as AuthResponseData;
		this.token = data.AccessToken;
		this.student = data.Students[0];
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
	async getHomePage(): Promise<Assignment[]> {
		if (this.student === null) throw new UninitializedApiError();
		let resp = await fetch(
			this.genRequest(
				`${this.apiUrl}/student/${this.student.Demographics.StudentID}`
			)
		);
		let data: Assignment[] = await resp.json();

		return data;
	}
}
