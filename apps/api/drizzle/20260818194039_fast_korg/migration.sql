CREATE TYPE "architecture" AS ENUM('x86_64', 'aarch64', 'armv7', 'i686', 'riscv64', 'ppc64le', 's390x');--> statement-breakpoint
CREATE TYPE "base_family" AS ENUM('debian', 'ubuntu', 'fedora', 'rhel', 'arch', 'opensuse', 'gentoo', 'slackware', 'independent');--> statement-breakpoint
CREATE TYPE "desktop_environment" AS ENUM('gnome', 'kde-plasma', 'xfce', 'cinnamon', 'mate', 'lxqt', 'budgie', 'pantheon', 'deepin', 'cosmic', 'none', 'multiple');--> statement-breakpoint
CREATE TYPE "distro_tag" AS ENUM('beginner-friendly', 'developer-friendly', 'gaming-ready', 'privacy-focused', 'lightweight', 'customizable', 'stable', 'cutting-edge', 'minimal', 'security-focused', 'beautiful-defaults', 'community-driven', 'commercial-backed', 'good-documentation', 'old-hardware-friendly');--> statement-breakpoint
CREATE TYPE "init_system" AS ENUM('systemd', 'openrc', 'runit', 's6', 'sysvinit', 'other');--> statement-breakpoint
CREATE TYPE "package_manager" AS ENUM('apt', 'dnf', 'pacman', 'zypper', 'portage', 'xbps', 'nix', 'apk', 'flatpak', 'snap', 'rpm-ostree', 'other');--> statement-breakpoint
CREATE TYPE "release_model" AS ENUM('fixed', 'rolling', 'semi-rolling', 'point-release', 'immutable');--> statement-breakpoint
CREATE TYPE "target_audience" AS ENUM('beginners', 'intermediate', 'advanced', 'developers', 'gamers', 'privacy-focused', 'old-hardware', 'servers', 'desktop', 'education', 'security', 'creators');--> statement-breakpoint
CREATE TABLE "distro_architectures" (
	"distro_id" uuid,
	"architecture" "architecture",
	CONSTRAINT "distro_architectures_pkey" PRIMARY KEY("distro_id","architecture")
);
--> statement-breakpoint
CREATE TABLE "distro_tags" (
	"distro_id" uuid,
	"tag" "distro_tag",
	CONSTRAINT "distro_tags_pkey" PRIMARY KEY("distro_id","tag")
);
--> statement-breakpoint
CREATE TABLE "distro_target_audiences" (
	"distro_id" uuid,
	"target_audience" "target_audience",
	CONSTRAINT "distro_target_audiences_pkey" PRIMARY KEY("distro_id","target_audience")
);
--> statement-breakpoint
CREATE TABLE "distros" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"slug" text NOT NULL UNIQUE,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"homepage_url" text NOT NULL,
	"release_model" "release_model" NOT NULL,
	"base_family" "base_family" NOT NULL,
	"package_manager" "package_manager" NOT NULL,
	"desktop_environment" "desktop_environment" NOT NULL,
	"init_system" "init_system" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "distro_architectures" ADD CONSTRAINT "distro_architectures_distro_id_distros_id_fkey" FOREIGN KEY ("distro_id") REFERENCES "distros"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "distro_tags" ADD CONSTRAINT "distro_tags_distro_id_distros_id_fkey" FOREIGN KEY ("distro_id") REFERENCES "distros"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "distro_target_audiences" ADD CONSTRAINT "distro_target_audiences_distro_id_distros_id_fkey" FOREIGN KEY ("distro_id") REFERENCES "distros"("id") ON DELETE CASCADE;