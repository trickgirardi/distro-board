import {
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const releaseModelEnum = pgEnum("release_model", [
  "fixed",
  "rolling",
  "semi-rolling",
  "point-release",
  "immutable",
]);

export const baseFamilyEnum = pgEnum("base_family", [
  "debian",
  "ubuntu",
  "fedora",
  "rhel",
  "arch",
  "opensuse",
  "gentoo",
  "slackware",
  "independent",
]);

export const packageManagerEnum = pgEnum("package_manager", [
  "apt",
  "dnf",
  "pacman",
  "zypper",
  "portage",
  "xbps",
  "nix",
  "apk",
  "flatpak",
  "snap",
  "rpm-ostree",
  "other",
]);

export const desktopEnvironmentEnum = pgEnum("desktop_environment", [
  "gnome",
  "kde-plasma",
  "xfce",
  "cinnamon",
  "mate",
  "lxqt",
  "budgie",
  "pantheon",
  "deepin",
  "cosmic",
  "none",
  "multiple",
]);

export const initSystemEnum = pgEnum("init_system", [
  "systemd",
  "openrc",
  "runit",
  "s6",
  "sysvinit",
  "other",
]);

export const architectureEnum = pgEnum("architecture", [
  "x86_64",
  "aarch64",
  "armv7",
  "i686",
  "riscv64",
  "ppc64le",
  "s390x",
]);

export const targetAudienceEnum = pgEnum("target_audience", [
  "beginners",
  "intermediate",
  "advanced",
  "developers",
  "gamers",
  "privacy-focused",
  "old-hardware",
  "servers",
  "desktop",
  "education",
  "security",
  "creators",
]);

export const distroTagEnum = pgEnum("distro_tag", [
  "beginner-friendly",
  "developer-friendly",
  "gaming-ready",
  "privacy-focused",
  "lightweight",
  "customizable",
  "stable",
  "cutting-edge",
  "minimal",
  "security-focused",
  "beautiful-defaults",
  "community-driven",
  "commercial-backed",
  "good-documentation",
  "old-hardware-friendly",
]);

export const distros = pgTable("distros", {
  id: uuid().defaultRandom().primaryKey(),
  slug: text().notNull().unique(),
  name: text().notNull(),
  shortDescription: text("short_description").notNull(),
  description: text().notNull(),
  logoUrl: text("logo_url"),
  homepageUrl: text("homepage_url").notNull(),
  documentationUrl: text("documentation_url"),
  sourceCodeUrl: text("source_code_url"),
  downloadUrl: text("download_url"),
  releaseModel: releaseModelEnum("release_model").notNull(),
  baseFamily: baseFamilyEnum("base_family").notNull(),
  packageManagers: packageManagerEnum("package_managers").array().notNull(),
  defaultDesktopEnvironment: desktopEnvironmentEnum(
    "default_desktop_environment",
  ).notNull(),
  supportedDesktopEnvironments: desktopEnvironmentEnum(
    "supported_desktop_environments",
  )
    .array()
    .notNull(),
  initSystem: initSystemEnum("init_system").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  // Drizzle writes a fresh value on every update made through this client.
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const distroArchitectures = pgTable(
  "distro_architectures",
  {
    distroId: uuid("distro_id")
      .notNull()
      .references(() => distros.id, { onDelete: "cascade" }),
    architecture: architectureEnum("architecture").notNull(),
  },
  (table) => [primaryKey({ columns: [table.distroId, table.architecture] })],
);

export const distroTargetAudiences = pgTable(
  "distro_target_audiences",
  {
    distroId: uuid("distro_id")
      .notNull()
      .references(() => distros.id, { onDelete: "cascade" }),
    targetAudience: targetAudienceEnum("target_audience").notNull(),
  },
  (table) => [primaryKey({ columns: [table.distroId, table.targetAudience] })],
);

export const distroTags = pgTable(
  "distro_tags",
  {
    distroId: uuid("distro_id")
      .notNull()
      .references(() => distros.id, { onDelete: "cascade" }),
    tag: distroTagEnum("tag").notNull(),
  },
  (table) => [primaryKey({ columns: [table.distroId, table.tag] })],
);

export type Distro = typeof distros.$inferSelect;
export type NewDistro = typeof distros.$inferInsert;
