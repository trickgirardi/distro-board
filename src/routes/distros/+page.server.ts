import { env } from '$env/dynamic/private';
import { createDb } from '$lib/server/db/client';
import { listDistros, parseListDistrosFilters } from '$lib/server/distros/queries/list-distros';
import type { DistroPreview } from '$lib/types/distro';

const FILTER_KEYS = [
	'search',
	'base',
	'releaseModel',
	'desktopEnvironment',
	'targetAudience'
] as const;

export type DistroFilters = Partial<Record<(typeof FILTER_KEYS)[number], string>>;

export const load = async ({ url }) => {
	const filters: DistroFilters = {};

	for (const key of FILTER_KEYS) {
		const value = url.searchParams.get(key);
		if (value) {
			filters[key] = value;
		}
	}

	try {
		const db = createDb(env.DATABASE_URL);
		const distros = (await listDistros(db, parseListDistrosFilters(filters))) as DistroPreview[];

		return { distros, apiUnavailable: false, filters };
	} catch {
		return { distros: [] as DistroPreview[], apiUnavailable: true, filters };
	}
};
