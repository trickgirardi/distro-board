export type DistroId = string;
export type DistroSlug = string;

export type ReleaseModel =
  | "fixed"
  | "rolling"
  | "semi-rolling"
  | "point-release"
  | "immutable";

export type BaseFamily =
  | "debian"
  | "ubuntu"
  | "fedora"
  | "rhel"
  | "arch"
  | "opensuse"
  | "gentoo"
  | "slackware"
  | "independent";

export type PackageManager =
  | "apt"
  | "dnf"
  | "pacman"
  | "zypper"
  | "portage"
  | "xbps"
  | "nix"
  | "apk"
  | "flatpak"
  | "snap"
  | "rpm-ostree"
  | "other";

export type DesktopEnvironment =
  | "gnome"
  | "kde-plasma"
  | "xfce"
  | "cinnamon"
  | "mate"
  | "lxqt"
  | "budgie"
  | "pantheon"
  | "deepin"
  | "cosmic"
  | "none"
  | "multiple";

export type InitSystem =
  | "systemd"
  | "openrc"
  | "runit"
  | "s6"
  | "sysvinit"
  | "other";

export type Architecture =
  | "x86_64"
  | "aarch64"
  | "armv7"
  | "i686"
  | "riscv64"
  | "ppc64le"
  | "s390x";

export type TargetAudience =
  | "beginners"
  | "intermediate"
  | "advanced"
  | "developers"
  | "gamers"
  | "privacy-focused"
  | "old-hardware"
  | "servers"
  | "desktop"
  | "education"
  | "security"
  | "creators";

export type DistroTag =
  | "beginner-friendly"
  | "developer-friendly"
  | "gaming-ready"
  | "privacy-focused"
  | "lightweight"
  | "customizable"
  | "stable"
  | "cutting-edge"
  | "minimal"
  | "security-focused"
  | "beautiful-defaults"
  | "community-driven"
  | "commercial-backed"
  | "good-documentation"
  | "old-hardware-friendly";
