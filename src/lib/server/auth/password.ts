const PBKDF2_ITERATIONS = 100_000;
const SALT_BYTES = 16;
const HASH_BITS = 256;

function toHex(bytes: Uint8Array) {
	return Array.from(bytes)
		.map((byte) => byte.toString(16).padStart(2, '0'))
		.join('');
}

function fromHex(hex: string) {
	const bytes = new Uint8Array(hex.length / 2);
	for (let i = 0; i < bytes.length; i++) {
		bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
	}
	return bytes;
}

async function derivePbkdf2Bits(password: string, salt: Uint8Array) {
	const key = await crypto.subtle.importKey(
		'raw',
		new TextEncoder().encode(password),
		'PBKDF2',
		false,
		['deriveBits']
	);

	const bits = await crypto.subtle.deriveBits(
		{ name: 'PBKDF2', salt: salt as BufferSource, iterations: PBKDF2_ITERATIONS, hash: 'SHA-256' },
		key,
		HASH_BITS
	);

	return new Uint8Array(bits);
}

/** Hashes a plaintext password into `"<saltHex>:<hashHex>"` using PBKDF2-SHA256. */
export async function hashPassword(password: string) {
	const salt = crypto.getRandomValues(new Uint8Array(SALT_BYTES));
	const hash = await derivePbkdf2Bits(password, salt);

	return `${toHex(salt)}:${toHex(hash)}`;
}

function timingSafeEqual(a: string, b: string) {
	if (a.length !== b.length) {
		return false;
	}

	let mismatch = 0;
	for (let i = 0; i < a.length; i++) {
		mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
	}

	return mismatch === 0;
}

/** Verifies a plaintext password against a hash produced by {@link hashPassword}. */
export async function verifyPassword(password: string, stored: string) {
	const [saltHex, hashHex] = stored.split(':');
	if (!saltHex || !hashHex) {
		return false;
	}

	const hash = await derivePbkdf2Bits(password, fromHex(saltHex));
	return timingSafeEqual(toHex(hash), hashHex);
}
