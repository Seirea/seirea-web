<script lang="ts">
	import { getContext } from "svelte";
	import { AeriesApi } from "$lib/api";
	import type { Assignment, ClassSummary, TermCode } from "$lib/api-types";
	import ClassComponent from "$lib/components/ClassComponent.svelte";

	const api: AeriesApi = getContext("api");
	let summariesPromise: Promise<ClassSummary[]> | null = $state(null);
	let as = api.authedStudent;

	let currentTerm: Promise<TermCode> | TermCode | null = $state(null);

	as.subscribe(async (val) => {
		console.log("update!", val);
		if (val != null) {
			console.log("calling home page update!");
			summariesPromise = api.getClassSummaries();
			currentTerm = summariesPromise.then(
				(summaries) => summaries[0].TermCode as "F" | "S",
			);
			summariesPromise.then(console.log);
		}
	});

	function onchange(event: Event) {
		const val = (event.target as HTMLSelectElement).value;
		currentTerm = val;
	}

	$inspect(currentTerm);
</script>

<div class="flex flex-col gap-4 p-4">
	<h1 class="text-4xl">Classes</h1>


	{#await currentTerm}
		<p>Loading term ...</p>
	{:then term}
		<div>
			<label for="term-select">Term:</label>
			<select name="terms" id="term-select" {onchange}>
				{#each [["F", "Fall"], ["S", "Spring"]] as termOpt}
					<option value={termOpt[0]} selected={term === termOpt[0]}
						>{termOpt[1]}</option
					>
				{/each}
			</select>
		</div>
	{/await}

	<div class="flex flex-col">
		{#await summariesPromise}
			<p>Loading classes ...</p>
		{:then summaries}
			{#each summaries! as summary}
				<ClassComponent classSummary={summary} />
			{/each}
			<!-- <table>
				<thead>
					<tr>
						<th>Class</th>
						<th>Info</th>
						<th>Score</th>
						<th>Grade</th>
					</tr>
				</thead>
				<tbody>
					{#if summaries !== null}
						{#each summaries as summary}
							<tr>
								<td>
									{#await currentTerm then term}
										<a
											href={`./classes/class?classId=${summary.GradeBookNumber.toString()}&term=${term}`}
											>{summary.CourseTitle}</a
										>
									{/await}
								</td>
								<td>{summary.TeacherName}</td>
								<td>{summary.Average || summary.Percent + "%"}</td>
								<td>{summary.CurrentMark}</td>
							</tr>
						{/each}
					{/if}
				</tbody>
			</table> -->
		{:catch err}
			<span
				>ERROR occured while getting classes: <code>{err.message}</code></span
			>
			<pre>{err.stack}</pre>
		{/await}
	
	
	
		<!-- <div class="flex flex-col"> -->
		
	</div>
</div>
