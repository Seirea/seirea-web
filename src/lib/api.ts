import {
	AuthRequestData,
	type Assignment,
	type AuthResponseData,
	type ClassSummary,
	type ClassSummaryDatum,
	type HomeScreenData,
	isFail,
	type Student,
	type AuthedStudent,
	type Gradebook,
} from "./api-types";

import { generateKeyFromTimestamp, getTimeFormatted } from "./auth/keygen";

import { writable, type Writable, get } from "svelte/store";

export class UninitializedApiError extends Error {
	constructor() {
		super("AeriesApi was not initialized");
		this.name = "UninitializedApiError";
	}
}

export class AeriesApi {
	public apiUrl: URL;
	public authedStudent: Writable<AuthedStudent | null>;

	public constructor(apiUrl: URL, authedStudent: AuthedStudent | null) {
		this.apiUrl = apiUrl;
		this.authedStudent = writable(authedStudent);
	}

	public isInitialized(): boolean {
		return get(this.authedStudent) != null;
	}

	// return true if able to authenticate
	public async authenticate(
		username: string,
		password: string
	): Promise<Boolean> {
		if (get(this.authedStudent) != null) {
			console.log("not sending auth request because already have auth token!");
			return true;
		}
		/* assume it sets `student` & `token` */
		const timestamp = getTimeFormatted();
		const secretKey = await generateKeyFromTimestamp(getTimeFormatted());
		let authData = new AuthRequestData(
			secretKey,
			timestamp,
			password,
			username
		);

		let resp = await fetch(
			this.genRequest("POST", "/authentication", authData)
		);

		if (!resp.ok) {
			return false;
		}

		let data = (await resp.json()) as AuthResponseData;
		console.log(data);

		if (isFail(data)) {
			console.log("auth fail!");
			return false;
		} else {
			console.log("auth success");
			this.authedStudent.set({
				Token: data.AccessToken,
				Student: data.Students[0],
			});
			return true;
		}
	}

	private genRequest(
		method: string,
		url: URL | string,
		body?: object
	): Request {
		let headers: { [id: string]: string } = {};
		if (url !== "/authentication") {
			if (this.authedStudent === null) throw new UninitializedApiError();
			headers["Authorization"] = `Bearer ${get(this.authedStudent)!.Token}`;
		}
		body = { url: this.apiUrl + url.toString(), method, headers, ...body };
		return new Request("/proxy", {
			body: JSON.stringify(body),
			method: "POST",
		});
	}

	public async getHomePage(): Promise<HomeScreenData> {
		if (this.authedStudent === null) throw new UninitializedApiError();
		let resp = await fetch(
			this.genRequest(
				"GET",
				`/student/${
					get(this.authedStudent)!.Student.Demographics.StudentID
				}/homescreendata`
			)
		);
		return await resp.json();
	}

	public async getClassSummaries(): Promise<ClassSummary[]> {
		if (!this.isInitialized()) throw new UninitializedApiError();
		let resp = await fetch(
			this.genRequest(
				"GET",
				`/student/${
					get(this.authedStudent)!.Student.Demographics.StudentID
				}/classsummary`
			)
		);
		let datum = (await resp.json()) as ClassSummaryDatum[];

		return datum
			.map((datum) =>
				datum.ClassSummary.filter((x) => x.Term == "Current Terms")
			)
			.flat();
	}
	public async getGradebook(
		gradebookNumber: number,
		term: string
	): Promise<Gradebook> {
		if (!this.isInitialized()) throw new UninitializedApiError();
		let resp = await fetch(
			this.genRequest(
				"GET",
				`/${get(this.authedStudent)!.Student.Demographics.SchoolCode}/student/${
					get(this.authedStudent)!.Student.Demographics.StudentID
				}/gradebooks/${gradebookNumber}/${term}`
			)
		);
		return await resp.json();
	}
}
