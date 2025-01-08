<script lang="ts">
	import type { ClassSummary } from "$lib/api-types";
	import Box from "$lib/components/Box.svelte";

	interface Props {
		classSummary: ClassSummary;
	}

	let p: Props = $props();

	let lastUpdated;
	if ((lastUpdated = p.classSummary.LastUpdated))
		lastUpdated = new Date(parseInt(lastUpdated.substring(6, lastUpdated.length - 2))).toLocaleString();
	else lastUpdated = "Not Yet Updated";

</script>

<a href={"./classes/class?classId=" + p.classSummary.GradeBookNumber.toString()}>
	<Box
		title={p.classSummary.CourseTitle}
		right={`${p.classSummary.CurrentMark} (${p.classSummary.Average || p.classSummary.Percent}%)`}
		titlesubtext={p.classSummary.GradeBookName}
		rightsubtext={lastUpdated}
	/>
</a>