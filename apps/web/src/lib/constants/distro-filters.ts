/**
 * Mirrors the enum values defined in apps/api/src/db/schema.ts.
 * Keep in sync until these move into a shared package.
 */

export type FilterOption = { value: string; label: string };

export const baseFamilyOptions: FilterOption[] = [
	{ value: 'debian', label: 'Debian' },
	{ value: 'ubuntu', label: 'Ubuntu' },
	{ value: 'fedora', label: 'Fedora' },
	{ value: 'rhel', label: 'RHEL' },
	{ value: 'arch', label: 'Arch' },
	{ value: 'opensuse', label: 'openSUSE' },
	{ value: 'gentoo', label: 'Gentoo' },
	{ value: 'slackware', label: 'Slackware' },
	{ value: 'independent', label: 'Independente' }
];

export const targetAudienceOptions: FilterOption[] = [
	{ value: 'beginners', label: 'Iniciantes' },
	{ value: 'intermediate', label: 'Intermediário' },
	{ value: 'advanced', label: 'Avançado' },
	{ value: 'developers', label: 'Desenvolvedores' },
	{ value: 'gamers', label: 'Gamers' },
	{ value: 'privacy-focused', label: 'Foco em privacidade' },
	{ value: 'old-hardware', label: 'Hardware antigo' },
	{ value: 'servers', label: 'Servidores' },
	{ value: 'desktop', label: 'Desktop' },
	{ value: 'education', label: 'Educação' },
	{ value: 'security', label: 'Segurança' },
	{ value: 'creators', label: 'Criadores de conteúdo' }
];

export const desktopEnvironmentOptions: FilterOption[] = [
	{ value: 'gnome', label: 'GNOME' },
	{ value: 'kde-plasma', label: 'KDE Plasma' },
	{ value: 'xfce', label: 'XFCE' },
	{ value: 'cinnamon', label: 'Cinnamon' },
	{ value: 'mate', label: 'MATE' },
	{ value: 'lxqt', label: 'LXQt' },
	{ value: 'budgie', label: 'Budgie' },
	{ value: 'pantheon', label: 'Pantheon' },
	{ value: 'deepin', label: 'Deepin' },
	{ value: 'cosmic', label: 'COSMIC' },
	{ value: 'multiple', label: 'Múltiplos' },
	{ value: 'none', label: 'Nenhum' }
];

export const releaseModelOptions: FilterOption[] = [
	{ value: 'fixed', label: 'Fixed' },
	{ value: 'point-release', label: 'Point release' },
	{ value: 'rolling', label: 'Rolling' },
	{ value: 'semi-rolling', label: 'Semi-rolling' },
	{ value: 'immutable', label: 'Imutável' }
];
