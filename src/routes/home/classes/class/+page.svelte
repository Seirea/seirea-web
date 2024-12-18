<script lang="ts">
	import { getContext, onMount } from "svelte";
	import type { PageData } from "./$types";
	import type { ClassSummary, Assignment, Gradebook } from "$lib/api-types";
	import type { AeriesApi } from "$lib/api";
	import AssignmentComponent from "$lib/components/AssignmentComponent.svelte";

	let { data }: { data: PageData } = $props();
	// type State = "loading" | null;

	// let summary: ClassSummary | State = $state("loading");

	let gradebook: Gradebook | null = $state(null);
	let summary: ClassSummary | null = $state(null);

	let api: AeriesApi = getContext("api");
	let as = api.authedStudent;

	if (data.classId !== null) {
		const classId = data.classId;

		as.subscribe(async (val) => {
			if (val != null) {
				console.log("getting assignments for", classId);
				const summaries = await api.getClassSummaries();
				const classSummary = summaries.find(
					(sum) => sum.GradeBookNumber == classId,
				);

				gradebook = await api.getGradebook(classId, classSummary!.TermCode);
				summary = (await api.getClassSummaries()).find(x => x.GradeBookNumber == classId) ?? null;
				console.log(await api.predictGrade(classId,"Assessments",240,250));
			}
		});

		// onMount(async () => {
		// 	const apigetGradebookInitialize();
		// 	const summaries = await apiClient.getClassSummaries();
		// 	assignments = 			console.log(assignments);
		// 	const classSummary = summaries.find(
		// 		(summary) => summary.GradeBookNumber == classId,
		// 	);
		// 	if (classSummary) summary = classSummary;
		// });
	}
</script>

<!--  I gutted out the loading state, but we need to add it back -->
{#if gradebook === null}
	<h1>Class Not Found</h1>
	<a href="/home/classes">go back</a>
{:else}
<div class="flex flex-col gap-4 p-4">
	<h1 class="text-4xl">{gradebook.GradebookName} - {summary?.Average || summary?.Percent + "%"}</h1>
	<div class="flex flex-col">
		{#each gradebook.Assignments as assignment}
			<AssignmentComponent {assignment}></AssignmentComponent>
		{/each}
		<p1>{$as != null ? "initialized" : "uninitialized"}</p1>
	</div>
</div>
{/if}
