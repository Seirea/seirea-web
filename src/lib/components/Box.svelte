<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		title: Snippet | string,
		right: Snippet | string,
		subtitle: Snippet | string,
		subright: Snippet | string,
	}

	let { title, subtitle, right, subright }: Props = $props();
	function isSnippet(val: Snippet | string): val is Snippet {
		return !(typeof val == "string");
	} 
</script>

{#snippet part(val: Snippet | string)}
	{#if isSnippet(val)}
		{@render val()}
	{:else}
		<p>{val}</p>
	{/if}
{/snippet}

<li
	class="flex flex-col border-2 rounded-md my-1 p-2 bg-gradient-to-tr from-indigo-100 to-blue-100 border-slate-200"
>
	<div class="flex flex-row justify-between text-xl">
		{@render part(title)}
		{@render part(right)}
	</div>
	<div class="flex flex-row justify-between">
		{@render part(subtitle)}
		{@render part(subright)}
	</div>
</li>
