<script lang="ts">
	import { goto } from "$app/navigation";

	function logout() {
		localStorage.removeItem("username");
		localStorage.removeItem("password");
		goto("/");
	}
</script>

<h1>Settings Page</h1>
<button on:click={logout}>Log out</button>
