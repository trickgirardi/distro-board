import { env } from '$env/dynamic/private';
import type { DistroPreview } from '$lib/types/distro';

export const load = async ({ fetch }) => {
	const apiUrl = env.API_URL ?? 'http://localhost:8787';

	try {
		const response = await fetch(`${apiUrl}/distros`);

		if (!response.ok) {
			return { distros: [] as DistroPreview[], apiUnavailable: true };
		}

		return { distros: (await response.json()) as DistroPreview[], apiUnavailable: false };
	} catch {
		return { distros: [] as DistroPreview[], apiUnavailable: true };
	}
};
