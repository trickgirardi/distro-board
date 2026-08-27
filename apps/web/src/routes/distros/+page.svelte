<script lang="ts">
	import DistroCard from '$lib/components/distros/distro-card.svelte';
	import DistroFilters from '$lib/components/distros/distro-filters.svelte';
	import type { DistroPreview } from '$lib/types/distro';
	import type { DistroFilters as DistroFiltersType } from './+page.server';

	let {
		data
	}: {
		data: {
			distros: DistroPreview[];
			apiUnavailable: boolean;
			filters: DistroFiltersType;
		};
	} = $props();
</script>

<svelte:head>
	<title>Distros — Distro Board</title>
	<meta
		name="description"
		content="Filtre distribuições Linux por base, uso recomendado, desktop e modelo de lançamento."
	/>
</svelte:head>

<main class="mx-auto min-h-[calc(100vh-4rem)] max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
	<section class="max-w-2xl">
		<h1 class="text-3xl font-semibold tracking-tight sm:text-4xl">Distribuições Linux</h1>
		<p class="mt-3 text-muted-foreground">
			Busque e filtre por base, uso recomendado, desktop e modelo de lançamento.
		</p>
	</section>

	<section class="mt-8">
		<DistroFilters filters={data.filters} />
	</section>

	<section class="mt-10" aria-labelledby="distro-grid-title">
		<div class="mb-5 flex items-baseline justify-between gap-4">
			<h2 id="distro-grid-title" class="text-lg font-semibold">Resultados</h2>
			<span class="text-sm text-muted-foreground">{data.distros.length} distros</span>
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
					: 'Nenhuma distro encontrada com esses filtros.'}
			</div>
		{/if}
	</section>
</main>
