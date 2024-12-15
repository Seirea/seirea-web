<script lang="ts">
	import Button from "$lib/components/Button.svelte";
	import { goto } from "$app/navigation";
	import { AeriesApi } from "$lib/api";
	import { onMount } from "svelte";

	let { children } = $props();

	function failedLogin(msg: string) {
		alert(`${msg}, returning to login page`);
		goto("/");
	}

	onMount(async () => {
		const username = localStorage.getItem("username");
		const password = localStorage.getItem("password");
		const apiUrl =
			localStorage.getItem("api-url") ??
			"https://aeries16.fjuhsd.org/parent/mobileapi/v1";

		if (username == null || password == null) {
			failedLogin("username or password not set");
		} else {
			const api = new AeriesApi(new URL(apiUrl), null, null);

			const authed = await api.authenticate(username, password);
			if (!authed) {
				localStorage.clear();
				alert("Unable to authenticate! Check your Email and Password.");
				goto("/");
			}
		}
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
