import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { createDb } from '$lib/server/db/client';
import { getDistro } from '$lib/server/distros/queries/get-distro';
import type { DistroDetail } from '$lib/types/distro';

export const load = async ({ params }) => {
	let distro: DistroDetail | null;

	try {
		const db = createDb(env.DATABASE_URL);
		distro = (await getDistro(db, params.slug)) as DistroDetail | null;
	} catch {
		error(503, 'Não foi possível carregar essa distro. Tente novamente em instantes.');
	}

	if (!distro) {
		error(404, 'Distro não encontrada.');
	}

	return { distro };
};
