<script lang="ts">
	import type { Assignment } from "$lib/api-types";

	interface Props {
		assignment: Assignment;
	}

	let p: Props = $props();

	let dd = p.assignment.LastUpdated;
	dd = dd.substring(6, dd.length - 2);
</script>

<li
	class="flex flex-col border-2 rounded-md my-1 p-2 bg-gradient-to-tr from-indigo-100 to-blue-100 border-slate-200"
>
	<div class="flex flex-row justify-between text-xl">
		<p>{p.assignment.AssignmentName}</p>
		<p>
			{`${p.assignment.Score}/${p.assignment.MaxScore} (${p.assignment.Percentage}%)`}
		</p>
	</div>
	<div class="flex flex-row justify-between">
		<p>{p.assignment.GradebookName}</p>
		<p>{new Date(parseInt(dd, 10)).toLocaleString()}</p>
	</div>
</li>
