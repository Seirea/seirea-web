<script lang="ts">
	import type { Assignment, GradebookAssignment } from "$lib/api-types";

	interface Props {
		assignment: Assignment | GradebookAssignment;
	}

	let {assignment}: Props = $props();
	function isGradeBook(assign: Assignment | GradebookAssignment): assign is GradebookAssignment {
		return (assign as Assignment).LastUpdated === undefined;
	}

	let dd = "";
	if (!isGradeBook(assignment))
		dd = assignment.LastUpdated;
	else
		dd = assignment.DateDue;
	dd = dd.substring(6, dd.length - 2);
</script>


<li
	class="flex flex-col border-2 rounded-md my-1 p-2 bg-gradient-to-tr from-indigo-100 to-blue-100 border-slate-200"
>
	<div class="flex flex-row justify-between text-xl">
		{#if !isGradeBook(assignment)}
			<p>{assignment.AssignmentName}</p>
		{:else}
			<p>{assignment.Description}</p>
		{/if}
		<p>
			{assignment.Score}/{assignment.MaxScore} ({#if !isGradeBook(assignment)}
			{assignment.Percentage}
		{:else}
			{assignment.Percent}
		{/if}%)
		</p>
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
