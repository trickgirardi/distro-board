ALTER TABLE "distros" ADD COLUMN "short_description" text NOT NULL;--> statement-breakpoint
ALTER TABLE "distros" ADD COLUMN "logo_url" text;--> statement-breakpoint
ALTER TABLE "distros" ADD COLUMN "documentation_url" text;--> statement-breakpoint
ALTER TABLE "distros" ADD COLUMN "source_code_url" text;--> statement-breakpoint
ALTER TABLE "distros" ADD COLUMN "download_url" text;--> statement-breakpoint
ALTER TABLE "distros" ADD COLUMN "package_managers" "package_manager"[] NOT NULL;--> statement-breakpoint
ALTER TABLE "distros" ADD COLUMN "default_desktop_environment" "desktop_environment" NOT NULL;--> statement-breakpoint
ALTER TABLE "distros" ADD COLUMN "supported_desktop_environments" "desktop_environment"[] NOT NULL;--> statement-breakpoint
ALTER TABLE "distros" DROP COLUMN "package_manager";--> statement-breakpoint
ALTER TABLE "distros" DROP COLUMN "desktop_environment";