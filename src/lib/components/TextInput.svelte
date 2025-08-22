<script lang="ts">
	type Props = { numeric?: boolean; value?: string | number } & Record<
		string,
		any
	>;
	let { numeric, value = $bindable(), ...userProps }: Props = $props();
	const allProps: any = {
		...userProps,
	};
	if (numeric === true) {
		allProps.inputmode = "numeric";
		allProps.pattern = "[0-9 .]*";
	}
</script>

<input
	class="p-0 h-full bg-blue-50 rounded-md border-slate-100 text-center invalid:bg-red-100 invalid:border-red-50"
	type="text"
	bind:value
	{...allProps}
/>

<style>
	input {
		width: var(--width, 3rem);
	}
</style>
