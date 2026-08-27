<script lang="ts">
	import { enhance } from '$app/forms';
	import { resolve } from '$app/paths';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	let { form }: { form?: { error?: string; name?: string; email?: string } } = $props();
</script>

<svelte:head>
	<title>Criar conta — Distro Board</title>
</svelte:head>

<main class="mx-auto flex min-h-[calc(100vh-4rem)] max-w-sm flex-col justify-center px-4 py-12">
	<h1 class="text-2xl font-semibold tracking-tight">Criar conta</h1>
	<p class="mt-1 text-sm text-muted-foreground">
		Já tem conta? <a class="text-primary hover:underline" href={resolve('/login')}>Entrar</a>
	</p>

	<form method="POST" use:enhance class="mt-8 grid gap-4">
		{#if form?.error}
			<p class="text-sm text-destructive">{form.error}</p>
		{/if}

		<div class="grid gap-1.5">
			<Label for="name">Nome</Label>
			<Input
				id="name"
				name="name"
				type="text"
				autocomplete="name"
				required
				value={form?.name ?? ''}
			/>
		</div>

		<div class="grid gap-1.5">
			<Label for="email">E-mail</Label>
			<Input
				id="email"
				name="email"
				type="email"
				autocomplete="email"
				required
				value={form?.email ?? ''}
			/>
		</div>

		<div class="grid gap-1.5">
			<Label for="password">Senha</Label>
			<Input
				id="password"
				name="password"
				type="password"
				autocomplete="new-password"
				required
				minlength={8}
			/>
		</div>

		<Button type="submit" class="mt-2">Criar conta</Button>
	</form>
</main>
