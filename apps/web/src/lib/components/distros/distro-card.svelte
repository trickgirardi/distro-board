<script lang="ts">
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import CardContent from '$lib/components/ui/card/card-content.svelte';
	import CardDescription from '$lib/components/ui/card/card-description.svelte';
	import CardHeader from '$lib/components/ui/card/card-header.svelte';
	import CardTitle from '$lib/components/ui/card/card-title.svelte';
	import type { DistroPreview } from '$lib/types/distro';

	let { distro }: { distro: DistroPreview } = $props();

	const formatLabel = (value: string) => value.replaceAll('-', ' ');
</script>

<Card class="h-full transition-shadow hover:shadow-md">
	<CardHeader class="gap-4">
		<div class="flex items-start gap-3">
			<div
				class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 font-semibold text-primary"
			>
				{#if distro.logoUrl}
					<img class="size-7 object-contain" src={distro.logoUrl} alt="" />
				{:else}
					{distro.name.slice(0, 1)}
				{/if}
			</div>
			<div class="min-w-0">
				<CardTitle>{distro.name}</CardTitle>
				<CardDescription class="mt-1 line-clamp-2">{distro.shortDescription}</CardDescription>
			</div>
		</div>
	</CardHeader>
	<CardContent class="mt-auto flex flex-wrap gap-2">
		<Badge variant="secondary">{formatLabel(distro.releaseModel)}</Badge>
		<Badge variant="outline">{formatLabel(distro.defaultDesktopEnvironment)}</Badge>
		{#each distro.packageManagers.slice(0, 2) as packageManager (packageManager)}
			<Badge variant="outline">{packageManager}</Badge>
		{/each}
	</CardContent>
</Card>
