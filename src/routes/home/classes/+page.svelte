<script lang="ts">
	import { getContext } from "svelte";
	import { AeriesApi } from "$lib/api";
	import type { Assignment, ClassSummary } from "$lib/api-types";
	import ClassComponent from "$lib/components/ClassComponent.svelte";

	const api: AeriesApi = getContext("api");
	let summariesPromise: Promise<ClassSummary[]> | null = $state(null);
	let as = api.authedStudent;

	let currentTerm: Term = $state("Current Terms");

	type Term = "Current Terms" | "Prior Terms" | "Future Terms";

	as.subscribe(async (val) => {
		console.log("update!", val);
		if (val != null) {
			summariesPromise = api.getClassSummaries(currentTerm);
			summariesPromise.then(console.log);
		}
	});
	$effect(() => {
		summariesPromise = api.getClassSummaries(currentTerm).then((x) => {
			console.log(currentTerm, x);
			return x;
		});
	});
	function onchange(event: Event) {
		const val = (event.target as HTMLSelectElement).value as Term;
		currentTerm = val;
	}

	$inspect(currentTerm);
</script>

<div class="flex flex-col gap-4 p-4">
	<h1 class="text-4xl">Classes</h1>

	<div>
		<label for="term-select">Term:</label>
		<select name="terms" id="term-select" {onchange}>
			{#each ["Current Terms", "Prior Terms", "Future Terms"] as termName}
				<option value={termName} selected={currentTerm === termName}
					>{termName}</option
				>
			{/each}
		</select>
	</div>

	<div class="flex flex-col">
		{#key currentTerm}
			{#await summariesPromise}
				<p>Loading classes ...</p>
			{:then summaries}
				{#each summaries! as summary}
					<ClassComponent classSummary={summary} />
				{/each}
			{:catch err}
				<span
					>ERROR occured while getting classes: <code>{err.message}</code></span
				>
				<pre>{err.stack}</pre>
			{/await}
		{/key}
	</div>
</div>
