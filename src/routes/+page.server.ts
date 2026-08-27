import { env } from '$env/dynamic/private';
import { createDb } from '$lib/server/db/client';
import { listDistros } from '$lib/server/distros/queries/list-distros';
import type { DistroPreview } from '$lib/types/distro';

export const load = async () => {
	try {
		const db = createDb(env.DATABASE_URL);
		const distros = (await listDistros(db)) as DistroPreview[];

		return { distros, apiUnavailable: false };
	} catch {
		return { distros: [] as DistroPreview[], apiUnavailable: true };
	}
};
