import { config } from 'dotenv';
import { eq } from 'drizzle-orm';
import { createDb } from './client';
import {
	architectureEnum,
	distroArchitectures,
	distroTagEnum,
	distroTags,
	distroTargetAudiences,
	distros,
	targetAudienceEnum,
	type NewDistro
} from './schema';

type Architecture = (typeof architectureEnum.enumValues)[number];
type TargetAudience = (typeof targetAudienceEnum.enumValues)[number];
type DistroTag = (typeof distroTagEnum.enumValues)[number];

type SeedDistro = Omit<NewDistro, 'id' | 'createdAt' | 'updatedAt'> & {
	architectures: Architecture[];
	targetAudiences: TargetAudience[];
	tags: DistroTag[];
};

const distroSeed: readonly SeedDistro[] = [
	{
		slug: 'debian',
		name: 'Debian',
		shortDescription: 'The universal operating system.',
		description:
			'A community-developed distribution known for its stability, broad architecture support, and commitment to free software.',
		homepageUrl: 'https://www.debian.org/',
		releaseModel: 'fixed',
		baseFamily: 'debian',
		packageManagers: ['apt'],
		defaultDesktopEnvironment: 'gnome',
		supportedDesktopEnvironments: ['gnome', 'kde-plasma', 'xfce', 'cinnamon', 'mate', 'lxqt'],
		initSystem: 'systemd',
		architectures: ['x86_64', 'aarch64', 'armv7', 'i686', 'riscv64', 'ppc64le', 's390x'],
		targetAudiences: ['desktop', 'servers', 'developers', 'education'],
		tags: ['stable', 'community-driven', 'good-documentation']
	},
	{
		slug: 'ubuntu',
		name: 'Ubuntu',
		shortDescription: 'A polished Linux platform for desktop, server, cloud, and IoT.',
		description:
			'A Debian-based distribution from Canonical focused on accessible releases and a broad ecosystem of desktop and server software.',
		homepageUrl: 'https://ubuntu.com/',
		releaseModel: 'fixed',
		baseFamily: 'ubuntu',
		packageManagers: ['apt', 'snap'],
		defaultDesktopEnvironment: 'gnome',
		supportedDesktopEnvironments: [
			'gnome',
			'kde-plasma',
			'xfce',
			'cinnamon',
			'mate',
			'lxqt',
			'budgie'
		],
		initSystem: 'systemd',
		architectures: ['x86_64', 'aarch64'],
		targetAudiences: ['beginners', 'desktop', 'servers', 'developers', 'education'],
		tags: ['beginner-friendly', 'stable', 'commercial-backed', 'good-documentation']
	},
	{
		slug: 'linux-mint',
		name: 'Linux Mint',
		shortDescription: 'A familiar and comfortable desktop Linux experience.',
		description:
			'An Ubuntu-based desktop distribution that emphasizes ease of use and ships polished Cinnamon, MATE, and Xfce editions.',
		homepageUrl: 'https://linuxmint.com/',
		releaseModel: 'fixed',
		baseFamily: 'ubuntu',
		packageManagers: ['apt', 'flatpak'],
		defaultDesktopEnvironment: 'cinnamon',
		supportedDesktopEnvironments: ['cinnamon', 'mate', 'xfce'],
		initSystem: 'systemd',
		architectures: ['x86_64'],
		targetAudiences: ['beginners', 'desktop', 'old-hardware'],
		tags: ['beginner-friendly', 'beautiful-defaults', 'stable', 'old-hardware-friendly']
	},
	{
		slug: 'fedora',
		name: 'Fedora Linux',
		shortDescription: 'An innovative Linux platform for desktops, servers, and clouds.',
		description:
			'A community-driven distribution sponsored by Red Hat that delivers current open-source technology in editions, spins, and atomic desktops.',
		homepageUrl: 'https://fedoraproject.org/',
		releaseModel: 'fixed',
		baseFamily: 'fedora',
		packageManagers: ['dnf', 'flatpak'],
		defaultDesktopEnvironment: 'gnome',
		supportedDesktopEnvironments: [
			'gnome',
			'kde-plasma',
			'xfce',
			'cinnamon',
			'mate',
			'lxqt',
			'budgie',
			'cosmic'
		],
		initSystem: 'systemd',
		architectures: ['x86_64', 'aarch64', 'riscv64', 'ppc64le', 's390x'],
		targetAudiences: ['desktop', 'servers', 'developers', 'creators'],
		tags: ['cutting-edge', 'community-driven', 'developer-friendly', 'good-documentation']
	},
	{
		slug: 'arch-linux',
		name: 'Arch Linux',
		shortDescription: 'A simple, lightweight, and flexible rolling distribution.',
		description:
			'An independently developed rolling-release distribution built around user choice, pacman, and the Arch Wiki.',
		homepageUrl: 'https://archlinux.org/',
		releaseModel: 'rolling',
		baseFamily: 'arch',
		packageManagers: ['pacman'],
		defaultDesktopEnvironment: 'none',
		supportedDesktopEnvironments: [
			'none',
			'gnome',
			'kde-plasma',
			'xfce',
			'cinnamon',
			'mate',
			'lxqt',
			'budgie'
		],
		initSystem: 'systemd',
		architectures: ['x86_64'],
		targetAudiences: ['advanced', 'developers', 'desktop'],
		tags: ['minimal', 'customizable', 'cutting-edge', 'good-documentation', 'community-driven']
	},
	{
		slug: 'opensuse-tumbleweed',
		name: 'openSUSE Tumbleweed',
		shortDescription: 'A tested rolling release from the openSUSE project.',
		description:
			'A rolling openSUSE distribution that continuously delivers updated packages after automated testing and openQA validation.',
		homepageUrl: 'https://get.opensuse.org/tumbleweed/',
		releaseModel: 'rolling',
		baseFamily: 'opensuse',
		packageManagers: ['zypper', 'flatpak'],
		defaultDesktopEnvironment: 'kde-plasma',
		supportedDesktopEnvironments: ['kde-plasma', 'gnome', 'xfce'],
		initSystem: 'systemd',
		architectures: ['x86_64', 'aarch64'],
		targetAudiences: ['intermediate', 'advanced', 'desktop', 'developers'],
		tags: ['cutting-edge', 'stable', 'community-driven', 'good-documentation']
	},
	{
		slug: 'opensuse-leap',
		name: 'openSUSE Leap',
		shortDescription: 'A stable and community-built Linux distribution.',
		description:
			'A fixed-release openSUSE distribution with a focus on predictable desktop and server deployments.',
		homepageUrl: 'https://get.opensuse.org/leap/',
		releaseModel: 'fixed',
		baseFamily: 'opensuse',
		packageManagers: ['zypper', 'flatpak'],
		defaultDesktopEnvironment: 'kde-plasma',
		supportedDesktopEnvironments: ['kde-plasma', 'gnome', 'xfce'],
		initSystem: 'systemd',
		architectures: ['x86_64', 'aarch64'],
		targetAudiences: ['desktop', 'servers', 'intermediate'],
		tags: ['stable', 'community-driven', 'good-documentation']
	},
	{
		slug: 'manjaro',
		name: 'Manjaro',
		shortDescription: 'A user-friendly rolling distribution based on Arch Linux.',
		description:
			'An Arch-based distribution that offers curated rolling packages and official desktop editions for a more approachable experience.',
		homepageUrl: 'https://manjaro.org/',
		releaseModel: 'rolling',
		baseFamily: 'arch',
		packageManagers: ['pacman', 'flatpak'],
		defaultDesktopEnvironment: 'xfce',
		supportedDesktopEnvironments: ['xfce', 'kde-plasma', 'gnome'],
		initSystem: 'systemd',
		architectures: ['x86_64', 'aarch64'],
		targetAudiences: ['beginners', 'intermediate', 'desktop', 'gamers'],
		tags: ['beginner-friendly', 'cutting-edge', 'beautiful-defaults', 'community-driven']
	},
	{
		slug: 'endeavouros',
		name: 'EndeavourOS',
		shortDescription: 'A terminal-centric Arch-based system ready to personalize.',
		description:
			'An Arch-based rolling distribution that provides a friendly installer while staying close to the Arch ecosystem.',
		homepageUrl: 'https://endeavouros.com/',
		releaseModel: 'rolling',
		baseFamily: 'arch',
		packageManagers: ['pacman', 'flatpak'],
		defaultDesktopEnvironment: 'xfce',
		supportedDesktopEnvironments: [
			'xfce',
			'kde-plasma',
			'gnome',
			'cinnamon',
			'mate',
			'lxqt',
			'budgie'
		],
		initSystem: 'systemd',
		architectures: ['x86_64', 'aarch64'],
		targetAudiences: ['intermediate', 'advanced', 'desktop', 'developers'],
		tags: ['customizable', 'cutting-edge', 'community-driven', 'good-documentation']
	},
	{
		slug: 'pop-os',
		name: 'Pop!_OS',
		shortDescription: 'A productivity-focused desktop Linux distribution by System76.',
		description:
			'An Ubuntu-based distribution with the COSMIC desktop, developer-oriented defaults, and dedicated installation images for NVIDIA hardware.',
		homepageUrl: 'https://system76.com/pop/',
		releaseModel: 'fixed',
		baseFamily: 'ubuntu',
		packageManagers: ['apt', 'flatpak'],
		defaultDesktopEnvironment: 'cosmic',
		supportedDesktopEnvironments: ['cosmic'],
		initSystem: 'systemd',
		architectures: ['x86_64', 'aarch64'],
		targetAudiences: ['developers', 'creators', 'gamers', 'desktop'],
		tags: ['developer-friendly', 'gaming-ready', 'beautiful-defaults', 'commercial-backed']
	},
	{
		slug: 'zorin-os',
		name: 'Zorin OS',
		shortDescription: 'A familiar desktop Linux alternative to Windows and macOS.',
		description:
			'An Ubuntu-based distribution designed to ease the transition from other desktop operating systems with familiar layouts and simple defaults.',
		homepageUrl: 'https://zorin.com/os/',
		releaseModel: 'fixed',
		baseFamily: 'ubuntu',
		packageManagers: ['apt', 'flatpak'],
		defaultDesktopEnvironment: 'gnome',
		supportedDesktopEnvironments: ['gnome'],
		initSystem: 'systemd',
		architectures: ['x86_64'],
		targetAudiences: ['beginners', 'desktop', 'old-hardware', 'gamers'],
		tags: ['beginner-friendly', 'beautiful-defaults', 'old-hardware-friendly', 'commercial-backed']
	},
	{
		slug: 'elementary-os',
		name: 'elementary OS',
		shortDescription: 'A thoughtful, privacy-respecting Linux desktop.',
		description:
			'An Ubuntu-based distribution built around the Pantheon desktop and a cohesive set of curated applications.',
		homepageUrl: 'https://elementary.io/',
		releaseModel: 'fixed',
		baseFamily: 'ubuntu',
		packageManagers: ['apt', 'flatpak'],
		defaultDesktopEnvironment: 'pantheon',
		supportedDesktopEnvironments: ['pantheon'],
		initSystem: 'systemd',
		architectures: ['x86_64', 'aarch64'],
		targetAudiences: ['beginners', 'desktop', 'creators'],
		tags: ['beginner-friendly', 'beautiful-defaults', 'privacy-focused']
	},
	{
		slug: 'nixos',
		name: 'NixOS',
		shortDescription: 'A declarative and reproducible Linux distribution.',
		description:
			'An independently developed distribution that uses the Nix package manager and declarative configuration for reproducible systems.',
		homepageUrl: 'https://nixos.org/',
		releaseModel: 'fixed',
		baseFamily: 'independent',
		packageManagers: ['nix'],
		defaultDesktopEnvironment: 'none',
		supportedDesktopEnvironments: [
			'none',
			'gnome',
			'kde-plasma',
			'xfce',
			'cinnamon',
			'mate',
			'lxqt',
			'budgie',
			'pantheon',
			'deepin',
			'cosmic'
		],
		initSystem: 'systemd',
		architectures: ['x86_64', 'aarch64', 'armv7', 'i686', 'riscv64'],
		targetAudiences: ['advanced', 'developers', 'servers', 'desktop'],
		tags: [
			'customizable',
			'developer-friendly',
			'cutting-edge',
			'good-documentation',
			'community-driven'
		]
	},
	{
		slug: 'gentoo',
		name: 'Gentoo',
		shortDescription: 'A source-based distribution built for customization.',
		description:
			'A flexible source-based distribution whose Portage system gives users detailed control over packages and build options.',
		homepageUrl: 'https://www.gentoo.org/',
		releaseModel: 'rolling',
		baseFamily: 'gentoo',
		packageManagers: ['portage'],
		defaultDesktopEnvironment: 'none',
		supportedDesktopEnvironments: [
			'none',
			'gnome',
			'kde-plasma',
			'xfce',
			'cinnamon',
			'mate',
			'lxqt',
			'budgie'
		],
		initSystem: 'openrc',
		architectures: ['x86_64', 'aarch64', 'armv7', 'i686', 'ppc64le', 's390x'],
		targetAudiences: ['advanced', 'developers', 'servers', 'desktop'],
		tags: ['customizable', 'minimal', 'community-driven', 'developer-friendly']
	},
	{
		slug: 'alpine-linux',
		name: 'Alpine Linux',
		shortDescription: 'A small, simple, and security-oriented Linux distribution.',
		description:
			'An independent distribution built around musl, BusyBox, OpenRC, and the apk package manager for lightweight systems and containers.',
		homepageUrl: 'https://www.alpinelinux.org/',
		releaseModel: 'fixed',
		baseFamily: 'independent',
		packageManagers: ['apk'],
		defaultDesktopEnvironment: 'none',
		supportedDesktopEnvironments: ['none', 'xfce', 'kde-plasma', 'gnome'],
		initSystem: 'openrc',
		architectures: ['x86_64', 'aarch64', 'armv7', 'i686', 'riscv64', 'ppc64le', 's390x'],
		targetAudiences: ['advanced', 'servers', 'security', 'old-hardware'],
		tags: ['minimal', 'lightweight', 'security-focused', 'stable']
	},
	{
		slug: 'void-linux',
		name: 'Void Linux',
		shortDescription: 'An independent rolling distribution with runit.',
		description:
			'A general-purpose rolling-release distribution that uses the xbps package manager and the runit init system.',
		homepageUrl: 'https://voidlinux.org/',
		releaseModel: 'rolling',
		baseFamily: 'independent',
		packageManagers: ['xbps'],
		defaultDesktopEnvironment: 'none',
		supportedDesktopEnvironments: [
			'none',
			'xfce',
			'kde-plasma',
			'gnome',
			'cinnamon',
			'mate',
			'lxqt'
		],
		initSystem: 'runit',
		architectures: ['x86_64', 'aarch64', 'armv7', 'i686'],
		targetAudiences: ['intermediate', 'advanced', 'desktop', 'servers'],
		tags: ['minimal', 'lightweight', 'customizable', 'community-driven']
	},
	{
		slug: 'slackware',
		name: 'Slackware',
		shortDescription: 'A long-standing Unix-like Linux distribution.',
		description:
			'An independent distribution that favors simplicity, traditional Unix practices, and a conservative approach to system design.',
		homepageUrl: 'https://www.slackware.com/',
		releaseModel: 'fixed',
		baseFamily: 'slackware',
		packageManagers: ['other'],
		defaultDesktopEnvironment: 'none',
		supportedDesktopEnvironments: ['none', 'kde-plasma', 'xfce'],
		initSystem: 'sysvinit',
		architectures: ['x86_64', 'i686'],
		targetAudiences: ['advanced', 'servers', 'desktop'],
		tags: ['stable', 'minimal', 'customizable', 'community-driven']
	},
	{
		slug: 'bazzite',
		name: 'Bazzite',
		shortDescription: 'An immutable gaming-focused operating system.',
		description:
			'A Fedora Atomic-based distribution tailored for gaming desktops, handhelds, and home-theater PCs with integrated Flatpak support.',
		homepageUrl: 'https://bazzite.gg/',
		releaseModel: 'immutable',
		baseFamily: 'fedora',
		packageManagers: ['rpm-ostree', 'flatpak'],
		defaultDesktopEnvironment: 'kde-plasma',
		supportedDesktopEnvironments: ['kde-plasma', 'gnome'],
		initSystem: 'systemd',
		architectures: ['x86_64'],
		targetAudiences: ['gamers', 'desktop'],
		tags: ['gaming-ready', 'stable', 'community-driven', 'beautiful-defaults']
	},
	{
		slug: 'kali-linux',
		name: 'Kali Linux',
		shortDescription: 'A Debian-based distribution for security professionals.',
		description:
			'A rolling distribution maintained by Offensive Security for penetration testing, security research, and digital forensics.',
		homepageUrl: 'https://www.kali.org/',
		releaseModel: 'rolling',
		baseFamily: 'debian',
		packageManagers: ['apt'],
		defaultDesktopEnvironment: 'xfce',
		supportedDesktopEnvironments: ['xfce', 'gnome', 'kde-plasma'],
		initSystem: 'systemd',
		architectures: ['x86_64', 'aarch64', 'armv7'],
		targetAudiences: ['advanced', 'security', 'developers'],
		tags: ['security-focused', 'cutting-edge', 'good-documentation', 'commercial-backed']
	},
	{
		slug: 'tails',
		name: 'Tails',
		shortDescription: 'A portable operating system that protects against surveillance.',
		description:
			'A Debian-based live operating system designed to preserve privacy and anonymity by routing network traffic through Tor.',
		homepageUrl: 'https://tails.net/',
		releaseModel: 'fixed',
		baseFamily: 'debian',
		packageManagers: ['apt'],
		defaultDesktopEnvironment: 'gnome',
		supportedDesktopEnvironments: ['gnome'],
		initSystem: 'systemd',
		architectures: ['x86_64'],
		targetAudiences: ['privacy-focused', 'security', 'desktop'],
		tags: ['privacy-focused', 'security-focused', 'minimal', 'community-driven']
	},
	{
		slug: 'cachy-os',
		name: 'CachyOS',
		shortDescription: 'A performance-oriented Arch-based rolling distribution.',
		description:
			'An Arch-based distribution that focuses on kernel and package optimizations for responsive desktops, gaming, and power users.',
		homepageUrl: 'https://cachyos.org/',
		releaseModel: 'rolling',
		baseFamily: 'arch',
		packageManagers: ['pacman', 'flatpak'],
		defaultDesktopEnvironment: 'kde-plasma',
		supportedDesktopEnvironments: [
			'kde-plasma',
			'gnome',
			'xfce',
			'cinnamon',
			'mate',
			'lxqt',
			'budgie'
		],
		initSystem: 'systemd',
		architectures: ['x86_64'],
		targetAudiences: ['intermediate', 'advanced', 'gamers', 'desktop'],
		tags: ['gaming-ready', 'cutting-edge', 'customizable', 'community-driven']
	}
];

export async function seedDatabase() {
	const { parsed } = config({ path: ['.env.local', '.env'] });
	const databaseUrl = parsed?.DATABASE_URL;

	if (!databaseUrl) {
		throw new Error('DATABASE_URL is required to seed the database.');
	}

	const db = createDb(databaseUrl);

	for (const distro of distroSeed) {
		const { architectures, tags, targetAudiences, ...distroData } = distro;
		const { slug, ...updatableDistroData } = distroData;
		const [savedDistro] = await db
			.insert(distros)
			.values(distroData)
			.onConflictDoUpdate({
				target: distros.slug,
				set: updatableDistroData
			})
			.returning({ id: distros.id });

		if (!savedDistro) {
			throw new Error(`Could not save ${slug}.`);
		}

		await db.delete(distroArchitectures).where(eq(distroArchitectures.distroId, savedDistro.id));
		await db
			.delete(distroTargetAudiences)
			.where(eq(distroTargetAudiences.distroId, savedDistro.id));
		await db.delete(distroTags).where(eq(distroTags.distroId, savedDistro.id));

		await db
			.insert(distroArchitectures)
			.values(architectures.map((architecture) => ({ distroId: savedDistro.id, architecture })));
		await db
			.insert(distroTargetAudiences)
			.values(
				targetAudiences.map((targetAudience) => ({ distroId: savedDistro.id, targetAudience }))
			);
		await db.insert(distroTags).values(tags.map((tag) => ({ distroId: savedDistro.id, tag })));
	}
}

await seedDatabase();
