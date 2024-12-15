<script lang="ts">
	import { getContext } from "svelte";
	import { AeriesApi } from "$lib/api";
	import type { Assignment, ClassSummary } from "$lib/api-types";

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
						<td
							><a
								href={"./classes/class?classId=" +
									summary.GradeBookNumber.toString()}>{summary.CourseTitle}</a
							></td
						>
						<td>{summary.TeacherName}</td>
						<td>{summary.Average || summary.Percent + "%"}</td>
						<td>{summary.CurrentMark}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
