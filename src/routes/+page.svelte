<script lang="ts">
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";
	import { AeriesApi } from "$lib/api";

	onMount(() => {
		if (
			localStorage.getItem("username") != null &&
			localStorage.getItem("password") != null
		) {
			goto("/home");
		}
	});

	async function handleLoginSubmit(e: SubmitEvent) {
		const formData = new FormData(e.target as HTMLFormElement);
		const username = formData.get("email") as string;
		const password = formData.get("password") as string;
		localStorage.setItem("username", username);
		localStorage.setItem("password", password);
		const apiUrl =
			localStorage.getItem("api-url") ??
			"https://aeries16.fjuhsd.org/parent/mobileapi/v1";
		localStorage.setItem("api-url", apiUrl);
		const api = new AeriesApi(new URL(apiUrl), null, null);
		const authed = await api.authenticate(username, password);
		if (!authed) {
			localStorage.clear();
			alert("Unable to authenticate! Check your Email and Password.");
			await goto("/");
		}
		const authData = api.dumpAuthData();
		localStorage.setItem("authData", JSON.stringify(authData));
		await goto("/home");
	}
</script>

<main class="max-w-xl mx-auto p-4">
	<h1 class="transition-all text-4xl hover:text-red-500 hover:font-bold">
		<a href="/about">Seirea</a>
	</h1>

	<form
		class="flex flex-col gap-2"
		on:submit|preventDefault={handleLoginSubmit}
	>
		<input
			type="email"
			name="email"
			class="form-input transition-all rounded-md shadow-md hover:border-blue-400"
			placeholder="Email"
		/>
		<input
			type="password"
			name="password"
			class="form-input transition-all rounded-md shadow-md hover:border-blue-400"
			placeholder="Password"
		/>

		<input
			type="submit"
			class="form-input cursor-pointer transition-all rounded-md shadow-md hover:border-blue-400 hover:bg-blue-200"
			name="Log in"
		/>
	</form>
</main>
