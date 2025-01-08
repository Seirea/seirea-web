<script lang="ts">
	interface Props {
		title: string,
		right: string,
		titlesubtext: string,
		rightsubtext: string,
	}

	let p: Props = $props();
</script>

<li
	class="flex flex-col border-2 rounded-md my-1 p-2 bg-gradient-to-tr from-indigo-100 to-blue-100 border-slate-200"
>
	<div class="flex flex-row justify-between text-xl">
		<p>{p.title}</p>
		<p>{p.right}</p>
	</div>
	<div class="flex flex-row justify-between">
		<p>{p.titlesubtext}</p>
		<p>{p.rightsubtext}</p>
	</div>
</li>
