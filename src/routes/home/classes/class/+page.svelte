<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { authAndInitialize } from '$lib/api';
	import type { ClassSummary, Assignment } from '$lib/api-types';

	let { data }: { data: PageData } = $props();
    type State = "loading" | null

    let summary: ClassSummary | State = $state("loading");
    let assignments: Assignment[] = $state([]);
    if (data.classId !== null) {
        const classId = data.classId;
        console.log(classId)
        onMount(async () => {
            const apiClient = await authAndInitialize();
            const summaries = await apiClient.getClassSummaries();
            assignments = await apiClient.getAssignmentsForClass(
                classId,
                summary != "loading" && summary !== null ? summary.TermCode : "F"
            );
            console.log(assignments);
	        const classSummary = summaries.find(summary => summary.GradeBookNumber == classId);
            if (classSummary)
                summary = classSummary;
        });
    }
</script>

{#if summary === null}
    <h1>Class Not Found</h1>
    <a href="/home/classes">go back</a>
{:else if summary === "loading"}
    <h1>Loading...</h1>
{:else}
    <div class="flex flex-col gap-4 p-4">
        <h1 class="text-4xl">{summary.CourseTitle}</h1>
        <div class="flex flex-col">
            <table>
                <thead>
                <tr>
                    <th>Assignment</th>
                    <th>Category</th>
                    <th>Score</th>
                </tr>
                </thead>
                <tbody>
                {#each assignments as assignment}
                    <tr>
                        <td>{assignment.Description}</td>
                        <td>{assignment.Category}</td>
                        <td>{assignment.Score}/{assignment.MaxScore}</td>
                    </tr>
                {/each}
                </tbody>
            </table>
        </div>
    </div>
{/if}

