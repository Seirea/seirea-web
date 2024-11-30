<script lang="ts">
  import { goto } from "$app/navigation";
  import { AeriesApi } from "$lib/api";
  import { onMount } from "svelte";

  function failedLogin(msg: string) {
    alert(`${msg}, returning to login page`);
    goto("/");
  }

  onMount(() => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    const apiUrl =
      localStorage.getItem("api-url") ??
      "https://aeries16.fjuhsd.org/parent/mobileapi/v1";
    if (username == null || password == null) {
      failedLogin("username or password not set");
    } else {
      const api = new AeriesApi(new URL(apiUrl));
      api.authenticate(username, password);
      console.log(api.getHomePage());
    }
  });
</script>

<h1>Home</h1>
