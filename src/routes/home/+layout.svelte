<script lang="ts">
	import Button from "$lib/components/Button.svelte";
	import { goto } from "$app/navigation";
	import { AeriesApi } from "$lib/api";
	import { getContext, onMount, setContext } from "svelte";
	import type { AuthedStudent } from "$lib/api-types";

	let { children } = $props();

	function failedLogin(msg: string) {
		alert(`${msg}, returning to login page`);
		goto("/");
	}

	const apiUrl =
		localStorage.getItem("api-url") ??
		"https://aeries16.fjuhsd.org/parent/mobileapi/v1";
	const authStudent = localStorage.getItem("api-authedStudent");
	console.log("in localstorage:", authStudent);

	const api = new AeriesApi(
		new URL(apiUrl),
		authStudent != null ? (JSON.parse(authStudent) as AuthedStudent) : null,
	);
	setContext("api", api);

	onMount(async () => {
		console.log("Authenticating...");
		const username = localStorage.getItem("username");
		const password = localStorage.getItem("password");

		if (username == null || password == null) {
			failedLogin("username or password not set");
			return;
		}

		let api: AeriesApi = getContext("api");
		const authed = await api.authenticate(username, password);
		if (!authed) {
			localStorage.removeItem("username");
			localStorage.removeItem("password");
			localStorage.removeItem("api-authedStudent");
			alert("Unable to authenticate! Check your Email and Password.");
			goto("/");
		}

		localStorage.setItem(
			"api-authedStudent",
			JSON.stringify(api.getAuthedStudent()),
		);
	});
</script>

<nav class="flex flex-row justify-between p-2">
	<Button href="/home">Seirea</Button>

	<div class="flex flex-row justify-between gap-4">
		<Button href="/home/classes">Classes</Button>
		<Button href="/home/settings">Settings</Button>
	</div>
</nav>

{@render children()}
