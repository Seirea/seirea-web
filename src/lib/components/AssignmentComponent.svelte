<script lang="ts">
	import type { Assignment } from "$lib/api-types";
	import Box from "$lib/components/Box.svelte";

	interface Props {
		assignment: Assignment;
	}

	let p: Props = $props();
	let lastUpdated;
	if (lastUpdated = p.assignment.LastUpdated)
		lastUpdated = new Date(parseInt(lastUpdated.substring(6, lastUpdated.length - 2), 10)).toLocaleString();
	else
		lastUpdated = "Not Yet Updated";
</script>

<Box
	title={p.assignment.AssignmentName}
	right={`${p.assignment.Score}/${p.assignment.MaxScore} (${p.assignment.Percentage}%)`}
	titlesubtext={p.assignment.GradebookName}
	rightsubtext={lastUpdated}
/>