import type {
	Address,
	Assignment,
	AuthResponseData,
	Demographics,
	PasswordRequirement,
	PasswordRule,
	Student,
	View,
} from "./api-types";

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
