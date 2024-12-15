<script lang="ts">
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";
	import { AeriesApi, authAndInitialize } from "$lib/api";
	import type { Assignment, ClassSummary } from "$lib/api-types";

	let summaries: ClassSummary[] = [];

	onMount(async () => {
		summaries = await (await authAndInitialize()).getClassSummaries();
        console.log(summaries);
    });
</script>

<div class="flex flex-col gap-4 p-4">
	<h1 class="text-4xl">Home</h1>
	<div class="flex flex-col">
		<table>
			<thead>
			<tr>
				<th>Class</th>
				<th>Info</th>
				<th>Score</th>
				<th>Grade</th>
			</tr>
			</thead>
			<tbody>
			{#each summaries as summary}
				<tr>
					<td><a href={"./classes/class?classId="+summary.GradeBookNumber.toString()}>{summary.CourseTitle}</a></td>
					<td>{summary.TeacherName}</td>
					<td>{summary.Average || (summary.Percent + "%")}</td>
					<td>{summary.CurrentMark}</td>
				</tr>
			{/each}
			</tbody>
		</table>
	</div>
</div>