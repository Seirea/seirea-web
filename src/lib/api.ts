import { AuthRequestData, type Assignment, type AuthResponseData, type ClassSummary, type ClassSummaryDatum, type HomeScreenData, isFail, type Student } from "./api-types";

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

	public constructor(apiUrl: URL, token: string | null, student: Student | null) {
		this.apiUrl = apiUrl;
		this.token = token;
		this.student = student;
	}

	// return true if able to authenticate
	public async authenticate(username: string, password: string): Promise<Boolean> {
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

	private genRequest(method: string, url: URL | string, body?: object): Request {
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
	public async getHomePage(): Promise<HomeScreenData> {
		if (this.student === null) throw new UninitializedApiError();
		let resp = await fetch(
			this.genRequest(
				"GET", `/student/${this.student.Demographics.StudentID}/homescreendata`
			)
		);
		return await resp.json();
	}
	
	public async getClassSummaries(): Promise<ClassSummary[]> {
		if (this.student === null) throw new UninitializedApiError();
		let resp = await fetch(
			this.genRequest(
				"GET", `/student/${this.student.Demographics.StudentID}/classsummary`
			)
		);
		let datum = await resp.json() as ClassSummaryDatum[];

		return datum.map(datum => datum.ClassSummary.filter(x => x.Term == "Current Terms")).flat();
	}
	public async getAssignmentsForClass(classId: number, term: string): Promise<Assignment[]> {
		if (this.student === null) throw new UninitializedApiError();
		let resp = await fetch(
			this.genRequest(
				"GET", `/${this.student.Demographics.SchoolCode}/student/${this.student.Demographics.StudentID}/gradebooks/${classId}/${term}`
			)
		);
		return (await resp.json())["Assignments"] as Assignment[] ?? [];
	}

	dumpAuthData(): object {
		if (this.student === null) throw new UninitializedApiError();
		return {
			student: this.student,
			token: this.token,
		};
	}
}

import { goto } from "$app/navigation";

export async function authAndInitialize(): Promise<AeriesApi> {
		const apiUrl = localStorage.getItem("api-url");
		const authData = JSON.parse(localStorage.getItem("authData") ?? "{}");
		if (apiUrl == null || authData == null) {
			alert("You are not logged in! Redirecting to login page...");
			await goto("/");
		} else {
			console.log(authData);
			const api = new AeriesApi(new URL(apiUrl), authData.token, authData.student);
			return api;
		}
		return new Promise((_, reject) => reject());
}