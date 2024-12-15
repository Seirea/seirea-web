<script lang="ts">
	import type { AeriesApi } from "$lib/api";
	import { getContext } from "svelte";

	const api: AeriesApi = getContext("api");
	console.log(api.getHomePage());
</script>

<div class="flex flex-col gap-4 p-4">
	<h1 class="text-4xl">Home</h1>
	<div class="flex flex-col"></div>
</div>
