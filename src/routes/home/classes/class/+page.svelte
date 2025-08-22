<script lang="ts">
	import { getContext } from "svelte";
	import type { PageData } from "./$types";
	import type {
		ClassSummary,
		Gradebook,
		GradebookAssignment,
		GradeChange,
	} from "$lib/api-types";
	import type { AeriesApi } from "$lib/api";
	import { groupBy } from "$lib/utils";
	import AssignmentComponent from "$lib/components/AssignmentComponent.svelte";
	import { SvelteMap } from "svelte/reactivity";
	import TextInput from "$lib/components/TextInput.svelte";

	let { data }: { data: PageData } = $props();

	let gradebookPromise: Promise<Gradebook> | null = $state(null);
	let summaryPromise: Promise<ClassSummary | null> | null = $state(null);

	type Grade = {
		typeOf: "empty" | "percent" | "average";
		value: number | null;
		mark: string | null;
	};
	const gradeToString = (g: Grade): string | null => {
		if (g.typeOf == "empty" && g.value == null) return null;
		if (g.typeOf == "percent") return g.value! + "%";
		if (g.typeOf == "average") return g.value!.toString();
		return null;
	};
	let grade: Grade = $state({ typeOf: "empty", value: null, mark: null });

	let changes = $state(new SvelteMap<number, GradeChange>());
	$effect(() => {
		api
			.predictGrade(data.classId!, data.termCode!, Array.from(changes.values()))
			.then(
				(ret) =>
					(grade = { typeOf: "percent", value: ret.Percent, mark: ret.Mark }),
			);
	});

	$inspect(changes);

	const groupByCategory = (t: GradebookAssignment[]) =>
		groupBy(t, (assign: GradebookAssignment) => assign.Category);

	let api: AeriesApi = getContext("api");
	let as = api.authedStudent;
	if (data.classId !== null) {
		const classId = data.classId;

		as.subscribe(async (val) => {
			if (val != null) {
				console.log("getting assignments for", classId);
				summaryPromise = api
					.getClassSummaries(null)
					.then(
						(summaries) =>
							summaries.find((summary) => summary.GradeBookNumber == classId) ??
							null,
					);
				gradebookPromise = summaryPromise.then((summary) =>
					api
						.getGradebook(classId, data.termCode || summary!.TermCode)
						.then((book) => {
							console.log(book);
							return book;
						}),
				);

				console.log(await api.getAttendance());
			}
		});
	}
	let dial: HTMLDialogElement;

	let dialScore = $state(0);
	let dialMaxScore = $state(0);
	let dialName = $state("Unnamed Assignment");
	let dialCategory = $state("");
	let assignId = $state(-1);

	function addAssign() {
		dial.close();
		assignId++;
	}
</script>

<dialog
	bind:this={dial}
	id="add-assign"
	class="bg-blue-200 rounded-md border-transparent p-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fixed"
>
	<div class="flex flex-col gap-4">
		<label
			>Name:
			<TextInput bind:value={dialName} --width="20rem" />
		</label>
		<label
			>Category:
			<TextInput bind:value={dialCategory} --width="18.5rem" />
		</label>
		<label
			>Score:
			<TextInput numeric bind:value={dialScore} />/<TextInput
				numeric
				bind:value={dialMaxScore}
			/>
		</label>
		<button onclick={addAssign}>Add</button>
	</div>
</dialog>

{#await summaryPromise}
	<h1>Loading ...</h1>
{:then summary}
	{#if summary === null}
		<h1>Class Not Found</h1>
		<a href="/home/classes">go back</a>
	{:else}
		<div class="flex flex-col gap-4 p-4">
			<h1 class="text-4xl">
				{summary.GradeBookName} - {gradeToString(grade) ??
					(summary?.Average || summary?.Percent + "%")}
			</h1>
			<button onclick={() => dial.show()}>+</button>
			{#await gradebookPromise}
				<p>Loading assignments ...</p>
			{:then gradebook}
				<div class="flex flex-col">
					{#if gradebook !== null}
						<ul>
							{#each Object.entries(groupByCategory(gradebook.Assignments)) as [categoryName, assignments]}
								{@const category = gradebook.Categories.find(
									(x) => x.Name === categoryName,
								)}
								<li>{categoryName} - {category?.Percent}</li>
								{#each assignments as assignment}
									<AssignmentComponent scoresMap={changes} {assignment} />
								{/each}
							{/each}
						</ul>
					{/if}
				</div>
			{:catch err}
				<span>ERROR while loading gradebook: <code>{err.message}</code></span>
				<pre>{err.stack}</pre>
			{/await}
		</div>
	{/if}
{:catch err}
	<span>ERROR while loading class summary: <code>{err.message}</code></span>
	<pre>{err.stack}</pre>
{/await}
