<script>
    import { generateKey } from "../lib/auth/keygen";
    console.log(generateKey())
</script>


<main class="max-w-xl mx-auto p-4">
    <h1 class="transition-all text-4xl hover:text-red-500 hover:font-bold"><a href="/about">Seirea</a></h1>
    <form class="flex flex-col gap-2">
        <input type="email" class="form-input rounded-md shadow-md" placeholder="Email"/>
        <input type="password" class="form-input rounded-md shadow-md" placeholder="Password"/>

        <input type="submit" class="form-input rounded-md shadow-md" name="Submit"/>
    </form>
</main>

