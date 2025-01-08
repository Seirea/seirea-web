<script lang="ts">
	import { getContext } from "svelte";
	import { AeriesApi } from "$lib/api";
	import type { Assignment, ClassSummary } from "$lib/api-types";
	import ClassComponent from "$lib/components/ClassComponent.svelte";

	const api: AeriesApi = getContext("api");
	let summaries: ClassSummary[] = $state([]);
	let as = api.authedStudent;

	as.subscribe(async (val) => {
		console.log("update!", val);
		if (val != null) {
			console.log("calling home page update!");
			summaries = await api.getClassSummaries();
			console.log(summaries);
		}
	});
</script>

<div class="flex flex-col gap-4 p-4">
	<h1 class="text-4xl">Classes</h1>
	<div class="flex flex-col">
		{#each summaries as summary}
			<ClassComponent classSummary={summary} />
		{/each}
	</div>
</div>
