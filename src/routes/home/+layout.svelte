<script>
    let {children} = $props();
</script>

<nav class="flex flex-row justify-between p-2">
    <h1>Seirea</h1>

    <div class="flex flex-row justify-between gap-4">
        <a href="/home/classes">Classes</a>
        <a href="/home/grades">Grades</a>
        <a href="/home/settings">Settings</a>
    </div>
</nav>

{@render children()}