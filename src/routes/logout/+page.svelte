<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
</script>

<svelte:head>
	<title>Sair — Distro Board</title>
</svelte:head>

<main
	class="mx-auto flex min-h-[calc(100vh-4rem)] max-w-sm flex-col items-center justify-center px-4 py-12 text-center"
>
	<h1 class="text-2xl font-semibold tracking-tight">Sair da conta</h1>
	<p class="mt-1 text-sm text-muted-foreground">Confirme para encerrar sua sessão.</p>

	<form method="POST" use:enhance class="mt-6">
		<Button type="submit" variant="outline">Sair</Button>
	</form>
</main>
