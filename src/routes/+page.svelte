<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  onMount(() => {
    if (
      localStorage.getItem("username") != null &&
      localStorage.getItem("password") != null
    ) {
      goto("/home");
    }
  });

  function handleLoginSubmit(e: SubmitEvent) {
    const formData = new FormData(e.target as HTMLFormElement);

    localStorage.setItem("username", formData.get("email") as string);
    localStorage.setItem("password", formData.get("password") as string);

    goto("/home");
  }
</script>

<main class="max-w-xl mx-auto p-4">
  <h1 class="transition-all text-4xl hover:text-red-500 hover:font-bold">
    <a href="/about">Seirea</a>
  </h1>
  <form
    class="flex flex-col gap-2"
    on:submit|preventDefault={handleLoginSubmit}
  >
    <input
      type="email"
      name="email"
      class="form-input transition-all rounded-md shadow-md hover:border-blue-400"
      placeholder="Email"
    />
    <input
      type="password"
      name="password"
      class="form-input transition-all rounded-md shadow-md hover:border-blue-400"
      placeholder="Password"
    />

    <input
      type="submit"
      class="form-input cursor-pointer transition-all rounded-md shadow-md hover:border-blue-400 hover:bg-blue-200"
      name="Log in"
    />
  </form>
</main>
