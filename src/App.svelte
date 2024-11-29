<script lang="ts">
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import Counter from './lib/Counter.svelte'
</script>

<main class="max-w-xl mx-auto p-4">
  <h1 class="text-4xl font-display">Seirea</h1>
  <form class="flex flex-col gap-2">
    <input type="email" class="form-input rounded-md shadow-md p-2" placeholder="Email"/>
    <input type="password" class="form-input rounded-md shadow-md p-2" placeholder="Password"/>

    <input type="submit" class="form-input rounded-md" name="Submit" />
  </form>
</main>