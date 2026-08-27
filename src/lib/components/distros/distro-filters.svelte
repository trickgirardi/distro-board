<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Select from '$lib/components/ui/select';
	import {
		baseFamilyOptions,
		desktopEnvironmentOptions,
		releaseModelOptions,
		targetAudienceOptions
	} from '$lib/constants/distro-filters';
	import type { DistroFilters } from '../../../routes/distros/+page.server';

	let { filters }: { filters: DistroFilters } = $props();

	let search = $state('');
	let base = $state('');
	let targetAudience = $state('');
	let desktopEnvironment = $state('');
	let releaseModel = $state('');

	// Resyncs local state when the URL's filters change externally (nav, back/forward).
	$effect(() => {
		search = filters.search ?? '';
		base = filters.base ?? '';
		targetAudience = filters.targetAudience ?? '';
		desktopEnvironment = filters.desktopEnvironment ?? '';
		releaseModel = filters.releaseModel ?? '';
	});

	const hasActiveFilters = $derived(
		Boolean(search || base || targetAudience || desktopEnvironment || releaseModel)
	);

	function applyFilters() {
		const query = new URLSearchParams();

		if (search) query.set('search', search);
		if (base) query.set('base', base);
		if (targetAudience) query.set('targetAudience', targetAudience);
		if (desktopEnvironment) query.set('desktopEnvironment', desktopEnvironment);
		if (releaseModel) query.set('releaseModel', releaseModel);

		const queryString = query.toString();
		goto(`${resolve('/distros')}${queryString ? `?${queryString}` : ''}`, {
			keepFocus: true,
			noScroll: true
		});
	}

	function clearFilters() {
		search = '';
		base = '';
		targetAudience = '';
		desktopEnvironment = '';
		releaseModel = '';
		goto(resolve('/distros'), { keepFocus: true, noScroll: true });
	}
</script>

<form
	class="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:items-end"
	onsubmit={(event) => {
		event.preventDefault();
		applyFilters();
	}}
>
	<div class="grid gap-1.5 lg:col-span-1">
		<Label for="distro-search">Busca</Label>
		<Input id="distro-search" type="search" placeholder="Nome da distro" bind:value={search} />
	</div>

	<div class="grid gap-1.5">
		<Label for="distro-base">Base</Label>
		<Select.Root
			type="single"
			value={base}
			onValueChange={(value) => {
				base = value ?? '';
				applyFilters();
			}}
		>
			<Select.Trigger id="distro-base" class="w-full">
				{baseFamilyOptions.find((option) => option.value === base)?.label ?? 'Todas'}
			</Select.Trigger>
			<Select.Content>
				<Select.Item value="">Todas</Select.Item>
				{#each baseFamilyOptions as option (option.value)}
					<Select.Item value={option.value} label={option.label} />
				{/each}
			</Select.Content>
		</Select.Root>
	</div>

	<div class="grid gap-1.5">
		<Label for="distro-target-audience">Uso recomendado</Label>
		<Select.Root
			type="single"
			value={targetAudience}
			onValueChange={(value) => {
				targetAudience = value ?? '';
				applyFilters();
			}}
		>
			<Select.Trigger id="distro-target-audience" class="w-full">
				{targetAudienceOptions.find((option) => option.value === targetAudience)?.label ??
					'Qualquer um'}
			</Select.Trigger>
			<Select.Content>
				<Select.Item value="">Qualquer um</Select.Item>
				{#each targetAudienceOptions as option (option.value)}
					<Select.Item value={option.value} label={option.label} />
				{/each}
			</Select.Content>
		</Select.Root>
	</div>

	<div class="grid gap-1.5">
		<Label for="distro-desktop">Desktop</Label>
		<Select.Root
			type="single"
			value={desktopEnvironment}
			onValueChange={(value) => {
				desktopEnvironment = value ?? '';
				applyFilters();
			}}
		>
			<Select.Trigger id="distro-desktop" class="w-full">
				{desktopEnvironmentOptions.find((option) => option.value === desktopEnvironment)?.label ??
					'Qualquer um'}
			</Select.Trigger>
			<Select.Content>
				<Select.Item value="">Qualquer um</Select.Item>
				{#each desktopEnvironmentOptions as option (option.value)}
					<Select.Item value={option.value} label={option.label} />
				{/each}
			</Select.Content>
		</Select.Root>
	</div>

	<div class="grid gap-1.5">
		<Label for="distro-release-model">Release model</Label>
		<Select.Root
			type="single"
			value={releaseModel}
			onValueChange={(value) => {
				releaseModel = value ?? '';
				applyFilters();
			}}
		>
			<Select.Trigger id="distro-release-model" class="w-full">
				{releaseModelOptions.find((option) => option.value === releaseModel)?.label ??
					'Qualquer um'}
			</Select.Trigger>
			<Select.Content>
				<Select.Item value="">Qualquer um</Select.Item>
				{#each releaseModelOptions as option (option.value)}
					<Select.Item value={option.value} label={option.label} />
				{/each}
			</Select.Content>
		</Select.Root>
	</div>

	<div class="flex gap-2 lg:col-span-5">
		<Button type="submit" size="sm">Filtrar</Button>
		{#if hasActiveFilters}
			<Button type="button" variant="ghost" size="sm" onclick={clearFilters}>Limpar filtros</Button>
		{/if}
	</div>
</form>
