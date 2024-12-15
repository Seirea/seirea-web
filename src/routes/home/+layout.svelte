<script lang="ts">
	import Button from "$lib/components/Button.svelte";
	import { goto } from "$app/navigation";
	import { AeriesApi } from "$lib/api";
	import { getContext, onMount, setContext } from "svelte";
	import type { AuthenticatedStudent } from "$lib/api-types";

	let { children } = $props();

	function failedLogin(msg: string) {
		alert(`${msg}\nReturning to login page...`);
		goto("/");
	}

	const apiUrl =
		localStorage.getItem("api-url") ??
		"https://aeries16.fjuhsd.org/parent/mobileapi/v1";
	const authStudent = localStorage.getItem("api-authedStudent");
	console.log("in localstorage:", authStudent);

	let apiState = new AeriesApi(
		new URL(apiUrl),
		authStudent != null
			? (JSON.parse(authStudent) as AuthenticatedStudent)
			: null,
	);
	setContext("api", apiState);
	let as = apiState.authedStudent;

	onMount(async () => {
		console.log("Authenticating...");
		const username = localStorage.getItem("username");
		const password = localStorage.getItem("password");

		if (username == null || password == null) {
			failedLogin("Username or password not set!");
			return;
		}

		const authed = await apiState.authenticate(username, password);
		if (!authed) {
			localStorage.removeItem("username");
			localStorage.removeItem("password");
			localStorage.removeItem("api-authedStudent");
			failedLogin("Unable to authenticate! Check your Email and Password.");
			return;
		}

		localStorage.setItem("api-authedStudent", JSON.stringify($as));
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
