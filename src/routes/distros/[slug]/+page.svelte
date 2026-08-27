<script lang="ts">
	import { resolve } from '$app/paths';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import type { DistroDetail } from '$lib/types/distro';
	import { formatEnumLabel } from '$lib/utils';

	let { data }: { data: { distro: DistroDetail } } = $props();

	const otherDesktops = $derived(
		data.distro.supportedDesktopEnvironments.filter(
			(de) => de !== data.distro.defaultDesktopEnvironment
		)
	);
</script>

<svelte:head>
	<title>{data.distro.name} — Distro Board</title>
	<meta name="description" content={data.distro.shortDescription} />
</svelte:head>

<main class="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:py-16">
	<a
		href={resolve('/distros')}
		class="text-sm text-muted-foreground transition-colors hover:text-foreground"
	>
		← Voltar para distros
	</a>

	<header class="mt-6 flex flex-wrap items-start gap-4">
		<div
			class="flex size-16 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-2xl font-semibold text-primary"
		>
			{#if data.distro.logoUrl}
				<img class="size-10 object-contain" src={data.distro.logoUrl} alt="" />
			{:else}
				{data.distro.name.slice(0, 1)}
			{/if}
		</div>

		<div class="min-w-0 flex-1">
			<h1 class="text-3xl font-semibold tracking-tight sm:text-4xl">{data.distro.name}</h1>
			<p class="mt-2 text-lg text-muted-foreground">{data.distro.shortDescription}</p>

			<div class="mt-4 flex flex-wrap gap-2">
				<Button href={data.distro.homepageUrl} target="_blank" rel="noreferrer">
					Site oficial
				</Button>
				{#if data.distro.downloadUrl}
					<Button href={data.distro.downloadUrl} target="_blank" rel="noreferrer" variant="outline">
						Download
					</Button>
				{/if}
			</div>
		</div>
	</header>

	<section
		class="mt-10 grid gap-6 border border-border p-6 sm:grid-cols-2 lg:grid-cols-3"
		aria-labelledby="summary-title"
	>
		<h2 id="summary-title" class="sr-only">Resumo técnico</h2>

		<div>
			<p class="text-xs font-medium tracking-wide text-muted-foreground uppercase">Base</p>
			<p class="mt-1 font-medium capitalize">{formatEnumLabel(data.distro.baseFamily)}</p>
		</div>
		<div>
			<p class="text-xs font-medium tracking-wide text-muted-foreground uppercase">
				Desktop principal
			</p>
			<p class="mt-1 font-medium capitalize">
				{formatEnumLabel(data.distro.defaultDesktopEnvironment)}
			</p>
		</div>
		<div>
			<p class="text-xs font-medium tracking-wide text-muted-foreground uppercase">Release model</p>
			<p class="mt-1 font-medium capitalize">{formatEnumLabel(data.distro.releaseModel)}</p>
		</div>
		<div>
			<p class="text-xs font-medium tracking-wide text-muted-foreground uppercase">
				Package managers
			</p>
			<p class="mt-1 font-medium capitalize">
				{data.distro.packageManagers.map(formatEnumLabel).join(', ')}
			</p>
		</div>
		<div>
			<p class="text-xs font-medium tracking-wide text-muted-foreground uppercase">Init system</p>
			<p class="mt-1 font-medium capitalize">{formatEnumLabel(data.distro.initSystem)}</p>
		</div>
		<div>
			<p class="text-xs font-medium tracking-wide text-muted-foreground uppercase">Arquiteturas</p>
			<p class="mt-1 font-medium capitalize">
				{data.distro.architectures.length > 0
					? data.distro.architectures.map(formatEnumLabel).join(', ')
					: '—'}
			</p>
		</div>
	</section>

	<section class="mt-10" aria-labelledby="description-title">
		<h2 id="description-title" class="text-lg font-semibold">Descrição</h2>
		<p class="mt-3 leading-7 whitespace-pre-line text-muted-foreground">
			{data.distro.description}
		</p>
	</section>

	{#if data.distro.targetAudiences.length > 0}
		<section class="mt-10" aria-labelledby="audience-title">
			<h2 id="audience-title" class="text-lg font-semibold">Ideal para</h2>
			<div class="mt-3 flex flex-wrap gap-2">
				{#each data.distro.targetAudiences as audience (audience)}
					<Badge variant="secondary">{formatEnumLabel(audience)}</Badge>
				{/each}
			</div>
		</section>
	{/if}

	{#if data.distro.tags.length > 0}
		<section class="mt-10" aria-labelledby="tags-title">
			<h2 id="tags-title" class="text-lg font-semibold">Tags</h2>
			<div class="mt-3 flex flex-wrap gap-2">
				{#each data.distro.tags as tag (tag)}
					<Badge variant="outline">{formatEnumLabel(tag)}</Badge>
				{/each}
			</div>
		</section>
	{/if}

	{#if otherDesktops.length > 0}
		<section class="mt-10" aria-labelledby="desktops-title">
			<h2 id="desktops-title" class="text-lg font-semibold">Outros desktops suportados</h2>
			<div class="mt-3 flex flex-wrap gap-2">
				{#each otherDesktops as desktopEnvironment (desktopEnvironment)}
					<Badge variant="outline">{formatEnumLabel(desktopEnvironment)}</Badge>
				{/each}
			</div>
		</section>
	{/if}

	<section class="mt-10 border-t border-border pt-8" aria-labelledby="links-title">
		<h2 id="links-title" class="text-lg font-semibold">Links</h2>
		<ul class="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
			<li>
				<a
					class="text-primary hover:underline"
					href={data.distro.homepageUrl}
					target="_blank"
					rel="noreferrer"
				>
					Site oficial
				</a>
			</li>
			{#if data.distro.downloadUrl}
				<li>
					<a
						class="text-primary hover:underline"
						href={data.distro.downloadUrl}
						target="_blank"
						rel="noreferrer"
					>
						Download
					</a>
				</li>
			{/if}
			{#if data.distro.documentationUrl}
				<li>
					<a
						class="text-primary hover:underline"
						href={data.distro.documentationUrl}
						target="_blank"
						rel="noreferrer"
					>
						Documentação
					</a>
				</li>
			{/if}
			{#if data.distro.sourceCodeUrl}
				<li>
					<a
						class="text-primary hover:underline"
						href={data.distro.sourceCodeUrl}
						target="_blank"
						rel="noreferrer"
					>
						Repositório
					</a>
				</li>
			{/if}
		</ul>
	</section>
</main>
