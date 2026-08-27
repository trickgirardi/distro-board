import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { DistroDetail } from '$lib/types/distro';

export const load = async ({ fetch, params }) => {
	const apiUrl = env.API_URL ?? 'http://localhost:8787';

	let response: Response;

	try {
		response = await fetch(`${apiUrl}/distros/${params.slug}`);
	} catch {
		error(503, 'Não foi possível conectar à API. Tente novamente em instantes.');
	}

	if (response.status === 404) {
		error(404, 'Distro não encontrada.');
	}

	if (!response.ok) {
		error(502, 'Não foi possível carregar essa distro.');
	}

	return { distro: (await response.json()) as DistroDetail };
};
