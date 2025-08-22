<script lang="ts">
	import type { ClassSummary } from "$lib/api-types";
	import { formatAeriesDate } from "$lib/utils";
	import Box from "$lib/components/Box.svelte";

	interface Props {
		classSummary: ClassSummary;
	}

	let p: Props = $props();

	const lastUpdated = formatAeriesDate(p.classSummary.LastUpdated);
</script>

<a
	href={`./classes/class?classId=${p.classSummary.GradeBookNumber.toString()}&term=${p.classSummary.TermCode}`}
>
	<Box
		title={p.classSummary.CourseTitle}
		right={`${p.classSummary.CurrentMark} (${p.classSummary.Average || p.classSummary.Percent}%)`}
		subtitle={p.classSummary.GradeBookName}
		subright={lastUpdated}
	/>
</a>
