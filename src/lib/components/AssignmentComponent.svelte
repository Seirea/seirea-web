<script lang="ts">
	import type { Assignment } from "$lib/api-types";

	interface Props {
		assignment: Assignment;
	}

	let p: Props = $props();

	let dd = p.assignment.GradingCompletedDate;
	dd = dd.substring(6, dd.length - 2);
</script>

<li class="flex flex-col border-2 rounded-md my-2 p-2">
	<div class="flex flex-row justify-between">
		<p>{p.assignment.AssignmentName}</p>
		<p>{p.assignment.Score}</p>
	</div>
	<div class="flex flex-row justify-between">
		<p>{p.assignment.GradebookName}</p>
		<p>{new Date(parseInt(dd, 10)).toLocaleDateString()}</p>
	</div>
</li>
