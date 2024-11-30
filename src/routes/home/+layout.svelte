<script>
    import Button from "$lib/components/Button.svelte";

    let {children} = $props();
</script>

<nav class="flex flex-row justify-between p-2">
    <h1>Seirea</h1>

    <div class="flex flex-row justify-between gap-4">
        <Button href="/home/classes">Classes</Button>
        <Button href="/home/grades">Grades</Button>
        <Button href="/home/settings">Settings</Button>
    </div>
</nav>

{@render children()}