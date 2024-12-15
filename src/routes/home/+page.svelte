<script lang="ts">
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";
	import { AeriesApi, authAndInitialize } from "$lib/api";
	import type { Assignment } from "$lib/api-types";

	let assignments: Assignment[] = [];

	onMount(async () => {
		assignments = (await (await authAndInitialize()).getHomePage()).RecentChanges;
	});

</script>

<div class="flex flex-col gap-4 p-4">
	<h1 class="text-4xl">Home</h1>
	<div class="flex flex-col">
		<table>
			<thead>
			<tr>
				<th>Assignment Name</th>
				<th>Category</th>
				<th>Score</th>
				<th>Max Score</th>
			</tr>
			</thead>
			<tbody>
			{#each assignments as assignment}
				<tr style:background-color={assignment.GradingCompleted ? "inherit" : "gray"}>
					<td>{assignment.AssignmentName}</td>
					<td>{assignment.CategoryDescription}</td>
					<td>{assignment.Score}</td>
					<td>{assignment.MaxScore}</td>
				</tr>
			{/each}
			</tbody>
		</table>
	</div>
</div>