<script lang="ts">
  import { goto } from "$app/navigation";

  function logout() {
    localStorage.clear();
    goto("/");
  }
</script>

<div class="flex flex-col gap-4 p-4">
  <h1 class="text-4xl">Settings</h1>

  <div class="flex flex-col">
    <button
      on:click={logout}
      class="form-input cursor-pointer transition-all rounded-md shadow-md hover:border-blue-400 hover:bg-blue-200"
      >Log out</button
    >
  </div>
</div>
