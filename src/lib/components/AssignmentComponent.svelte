<script lang="ts">
	import type { Assignment, GradebookAssignment } from "$lib/api-types";
	import { fade } from "svelte/transition";

	interface Props {
		assignment: Assignment | GradebookAssignment;
		curMaxScore?: number;
		curScore?: number;
	}

	let { assignment, curMaxScore = $bindable(assignment.MaxScore), curScore = $bindable(assignment.Score) }: Props = $props();
	function isGradeBook(
		assign: Assignment | GradebookAssignment,
	): assign is GradebookAssignment {
		return (assign as Assignment).LastUpdated === undefined;
	}
	const trunc = (x: string) => x.substring(6, x.length - 2);

	let dd = trunc(
		!isGradeBook(assignment) ? assignment.LastUpdated : assignment.DateDue,
	);

	//let curMaxScore = $state(assignment.MaxScore);
	//let curScore = $state(assignment.Score);
	const curPercent = $derived(curMaxScore == 0 ? "" : ` (${(curScore/curMaxScore * 100).toPrecision(4)}%)`)

</script>

<li
	transition:fade|global={{ duration: 200 }}
	class="flex flex-col border-2 rounded-md my-1 p-2 bg-gradient-to-tr from-indigo-100 to-blue-100 border-slate-200"
>
	<div class="flex flex-row justify-between text-xl">
		{#if !isGradeBook(assignment)}
			<p>{assignment.AssignmentName}</p>
			<p>
				{assignment.Score}/{assignment.MaxScore} ({assignment.Percentage}%)
			</p>
		{:else}
			<p>{assignment.Description}</p>
			<span
				><input
					class="w-10 p-0 h-full bg-blue-50 rounded-md border-slate-100 text-center"
					type="number"
					bind:value={curScore}
				/>/<input
					class="w-10 p-0 h-full bg-blue-50 rounded-md border-slate-100 text center"
					type="number"
					bind:value={curMaxScore}
				/>{curPercent}</span
			>
		{/if}
		<!-- <p>
			{assignment.Score}/{assignment.MaxScore} ({!isGradeBook(assignment) ? assignment.Percentage : assignment.Percent}%)
		</p> -->
	</div>
	<div class="flex flex-row justify-between">
		{#if !isGradeBook(assignment)}
			<p>{assignment.GradebookName}</p>
		{:else}
			<p>{assignment.Category}</p>
		{/if}
		<p>{new Date(parseInt(dd, 10)).toLocaleString()}</p>
	</div>
</li>
