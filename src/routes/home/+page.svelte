<script lang="ts">
	import type { AeriesApi } from "$lib/api";
	import { getContext } from "svelte";
	import { type Writable } from "svelte/store";

	const api: Writable<AeriesApi> = getContext("api");
	api.subscribe((val) => {
		console.log("UPDATED!", val);
	});
</script>

<div class="flex flex-col gap-4 p-4">
	<h1 class="text-4xl">Home</h1>
	<div class="flex flex-col">
		<p1>{$api.authedStudent}</p1>
	</div>
</div>
