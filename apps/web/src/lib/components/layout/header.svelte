<script>
	import { resolve } from '$app/paths';
	import Button from '../ui/button/button.svelte';

	const homePath = resolve('/');
</script>

<header class="border-b border-border bg-background">
	<div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
		<a class="text-lg font-semibold tracking-tight" href={homePath}>Distro Board</a>
		<nav aria-label="Navegação principal">
			<Button variant="ghost" size="sm" href={homePath}>Distros</Button>
		</nav>
	</div>
</header>
