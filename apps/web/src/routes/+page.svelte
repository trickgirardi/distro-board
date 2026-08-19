<script lang="ts">
	import DistroCard from '$lib/components/distros/distro-card.svelte';
	import type { DistroPreview } from '$lib/types/distro';

	let {
		data
	}: {
		data: {
			distros: DistroPreview[];
			apiUnavailable: boolean;
		};
	} = $props();
</script>

<svelte:head>
	<title>Distro Board — Linux distributions</title>
	<meta
		name="description"
		content="Explore a curated collection of Linux distributions and their characteristics."
	/>
</svelte:head>

<main class="mx-auto min-h-[calc(100vh-4rem)] max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
	<section class="max-w-2xl">
		<p class="text-sm font-medium text-primary">Linux distributions</p>
		<h1 class="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Find your next distro.</h1>
		<p class="mt-4 text-lg leading-8 text-muted-foreground">
			Compare release models, package managers, desktop environments, and more.
		</p>
	</section>

	<section class="mt-12" aria-labelledby="distro-grid-title">
		<div class="mb-5 flex items-baseline justify-between gap-4">
			<h2 id="distro-grid-title" class="text-lg font-semibold">All distributions</h2>
			<span class="text-sm text-muted-foreground">{data.distros.length} available</span>
		</div>

		{#if data.distros.length > 0}
			<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{#each data.distros as distro (distro.id)}
					<DistroCard {distro} />
				{/each}
			</div>
		{:else}
			<div class="border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
				{data.apiUnavailable
					? 'Não foi possível carregar as distros. Verifique se a API está disponível.'
					: 'Nenhuma distro cadastrada ainda.'}
			</div>
		{/if}
	</section>
</main>

<footer class="border-t border-border">
	<div
		class="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 text-sm text-muted-foreground sm:px-6"
	>
		<p>Built for Linux explorers.</p>
		<p>{new Date().getFullYear()} Distro Board</p>
	</div>
</footer>
