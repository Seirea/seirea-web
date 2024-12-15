<script lang="ts">
	import type { AeriesApi } from "$lib/api";
	import type { Assignment } from "$lib/api-types";
	import { getContext, onMount } from "svelte";
	import { type Writable } from "svelte/store";
	import AssignmentComponent from "$lib/components/AssignmentComponent.svelte";

	const api: AeriesApi = getContext("api");
	let assignments: Assignment[] = $state([]);
	let as = api.authedStudent;

	as.subscribe(async (val) => {
		console.log("update!", val);
		if (val != null) {
			console.log("calling home page update!");
			assignments = (await api.getHomePage()).RecentChanges;
			console.log(assignments);
		}
	});
</script>

<div class="flex flex-col gap-4 p-4">
	<h1 class="text-4xl">Home</h1>
	<div class="flex flex-col">
		{#each assignments as assignment}
			<AssignmentComponent {assignment}></AssignmentComponent>
		{/each}
		<p1>{$as != null ? "initialized" : "uninitialized"}</p1>
	</div>
</div>
