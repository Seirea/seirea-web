<script lang="ts">
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";
	import { AeriesApi } from "$lib/api";
	import type { Assignment } from "$lib/api-types";

	let assignments: Assignment[] = [];

	onMount(async () => {
		const apiUrl = localStorage.getItem("api-url");
		const authData = JSON.parse(localStorage.getItem("authData") ?? "{}");
		if (apiUrl == null || authData == null) {
			alert("You are not logged in! Redirecting to login page...");
			await goto("/");
		} else {
			console.log(authData);
			const api = new AeriesApi(new URL(apiUrl), authData.token, authData.student);
			const homedata = await api.getHomePage();
			assignments = homedata.RecentChanges;
			console.warn(homedata);

		}
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