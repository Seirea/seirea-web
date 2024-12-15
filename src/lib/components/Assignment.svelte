<script lang="ts">
	import type { Assignment } from "$lib/api-types";

	let dis: Assignment = $props();
</script>

<li class="flex flex-col">
	<div class="flex flex-row justify-between">
		<p>{dis.name}</p>
		<p>{dis.score}</p>
	</div>
	<div class="flex flex-row justify-between">
		<p>{dis.classname}</p>
		<p>{dis.duedate}</p>
	</div>
</li>
