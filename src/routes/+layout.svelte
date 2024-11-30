<script lang="ts">
  import "@fontsource-variable/inter";
  import "../app.css";
  let { children } = $props();
</script>

<div class="font-display">
  {@render children()}
</div>
