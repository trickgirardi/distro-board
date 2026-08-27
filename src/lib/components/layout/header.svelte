<script lang="ts">
	import { resolve } from '$app/paths';
	import type { PublicUser } from '$lib/types/user';
	import Button from '../ui/button/button.svelte';

	let { user }: { user: PublicUser | null } = $props();

	const homePath = resolve('/');
	const distrosPath = resolve('/distros');
	const loginPath = resolve('/login');
	const logoutPath = resolve('/logout');
</script>

<header class="border-b border-border bg-background">
	<div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
		<a class="text-lg font-semibold tracking-tight" href={homePath}>Distro Board</a>
		<nav class="flex items-center gap-2" aria-label="Navegação principal">
			<Button variant="ghost" size="sm" href={distrosPath}>Distros</Button>
			{#if user}
				<span class="text-sm text-muted-foreground">{user.name}</span>
				<form method="POST" action={logoutPath}>
					<Button type="submit" variant="ghost" size="sm">Sair</Button>
				</form>
			{:else}
				<Button variant="ghost" size="sm" href={loginPath}>Entrar</Button>
			{/if}
		</nav>
	</div>
</header>
