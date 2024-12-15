import { AuthRequestData, type AuthResponseData, type HomeScreenData, isFail, type Student } from "./api-types";

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

	constructor(apiUrl: URL, token: string | null, student: Student | null) {
		this.apiUrl = apiUrl;
		this.token = token;
		this.student = student;
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
		let headers: { [id: string] : string} = {};
		if (url !== "/authentication") {
			if (this.token === null) throw new UninitializedApiError();
			headers["Authorization"] = `Bearer ${this.token}`;
		}
		body = {url: this.apiUrl + url.toString(), method, headers, ...body};
		return new Request("/proxy", {
			body: JSON.stringify(body),
			method: "POST",
		});
	}

	async getHomePage(): Promise<HomeScreenData> {
		if (this.student === null) throw new UninitializedApiError();
		let resp = await fetch(
			this.genRequest(
				"GET", `/student/${this.student.Demographics.StudentID}/homescreendata`
			)
		);
		return await resp.json();
	}
}
