<script lang="ts">
  import { generateKey } from "../lib/auth/keygen";
  console.log(generateKey());

  function handleLoginSubmit(e: SubmitEvent) {
    const formData = new FormData(e.target as HTMLFormElement);
    console.log(formData);
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
