<script>
  import { generateKey } from "../lib/auth/keygen";
  console.log(generateKey());
</script>

<main class="max-w-xl mx-auto p-4">
  <h1 class="transition-all text-4xl hover:text-red-500 hover:font-bold">
    <a href="/about">Seirea</a>
  </h1>
  <form class="flex flex-col gap-2">
    <input
      type="email"
      class="form-input transition-all rounded-md shadow-md hover:border-blue-400"
      placeholder="Email"
    />
    <input
      type="password"
      class="form-input transition-all rounded-md shadow-md hover:border-blue-400"
      placeholder="Password"
    />

    <input
      type="submit"
      class="form-input transition-all rounded-md shadow-md hover:border-blue-400 hover:bg-gradient-to-tr hover:from-blue-200 hover:to-red-200 "
      name="Log in"
    />
  </form>
</main>
