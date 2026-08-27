import { env } from '$env/dynamic/private';
import type { DistroPreview } from '$lib/types/distro';

const FILTER_KEYS = [
	'search',
	'base',
	'releaseModel',
	'desktopEnvironment',
	'targetAudience'
] as const;

export type DistroFilters = Partial<Record<(typeof FILTER_KEYS)[number], string>>;

export const load = async ({ fetch, url }) => {
	const apiUrl = env.API_URL ?? 'http://localhost:8787';

	const filters: DistroFilters = {};
	const query = new URLSearchParams();

	for (const key of FILTER_KEYS) {
		const value = url.searchParams.get(key);
		if (value) {
			filters[key] = value;
			query.set(key, value);
		}
	}

	const queryString = query.toString();

	try {
		const response = await fetch(`${apiUrl}/distros${queryString ? `?${queryString}` : ''}`);

		if (!response.ok) {
			return { distros: [] as DistroPreview[], apiUnavailable: true, filters };
		}

		return {
			distros: (await response.json()) as DistroPreview[],
			apiUnavailable: false,
			filters
		};
	} catch {
		return { distros: [] as DistroPreview[], apiUnavailable: true, filters };
	}
};
