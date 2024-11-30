<script>
    let {href, children} = $props()
</script>

<a {href} class="hover:text-red-500 hover:font-bold transition-all">
    {@render children()}
</a>