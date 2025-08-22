<script lang="ts">
	import type {
		Assignment,
		GradebookAssignment,
		GradeChange,
	} from "$lib/api-types";
	import Box from "$lib/components/Box.svelte";
	import TextInput from "$lib/components/TextInput.svelte";
	import { formatAeriesDate } from "$lib/utils";
	import { untrack } from "svelte";
	import type { SvelteMap } from "svelte/reactivity";

	interface Props {
		assignment: Assignment | GradebookAssignment;
		scoresMap?: SvelteMap<number, GradeChange>;
	}

	let { assignment, scoresMap = $bindable() }: Props = $props();

	function isGradeBook(
		assign: Assignment | GradebookAssignment,
	): assign is GradebookAssignment {
		return (assign as Assignment).LastUpdated === undefined;
	}

	let curMaxScore = $state(assignment.MaxScore);
	let curScore = $state(assignment.Score);
	const curPercent = $derived(
		curMaxScore == 0 || Number.isNaN(curScore / curMaxScore)
			? ""
			: ` (${((curScore / curMaxScore) * 100).toPrecision(4)}%)`,
	);
	if (isGradeBook(assignment) && scoresMap !== undefined)
		$effect(() => {
			scoresMap.set(assignment.AssignmentNumber, {
				Category: assignment.Category,
				Score: curScore,
				MaxScore: curMaxScore,
				AssignmentNumber: assignment.AssignmentNumber,
				Mark: "",
			});
		});

	let date = formatAeriesDate(
		!isGradeBook(assignment) ? assignment.LastUpdated : assignment.DateDue,
	);
</script>

<Box
	title={!isGradeBook(assignment)
		? assignment.AssignmentName
		: assignment.Description}
	subtitle={isGradeBook(assignment)
		? assignment.Category
		: assignment.GradebookName}
	subright={date}
>
	{#snippet right()}
		{#if !isGradeBook(assignment)}
			<p>
				{assignment.Score}/{assignment.MaxScore} ({assignment.Percentage}%)
			</p>
		{:else}
			<span>
				<TextInput numeric bind:value={curScore} />/<TextInput
					numeric
					bind:value={curMaxScore}
				/>{curPercent}</span
			>
		{/if}
	{/snippet}
</Box>
