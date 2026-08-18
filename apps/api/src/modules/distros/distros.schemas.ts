import {
  architectureEnum,
  distroTagEnum,
  targetAudienceEnum,
  type NewDistro,
} from "../../db/schema";

type Architecture = (typeof architectureEnum.enumValues)[number];
type TargetAudience = (typeof targetAudienceEnum.enumValues)[number];
type DistroTag = (typeof distroTagEnum.enumValues)[number];

export type DistroRelations = {
  architectures: Architecture[];
  targetAudiences: TargetAudience[];
  tags: DistroTag[];
};

export type DistroInput = Omit<NewDistro, "id" | "createdAt" | "updatedAt"> & DistroRelations;
export type DistroUpdate = Omit<DistroInput, "slug">;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasDistroFields(value: Record<string, unknown>): boolean {
  const requiredStrings = [
    "name",
    "shortDescription",
    "description",
    "homepageUrl",
    "releaseModel",
    "baseFamily",
    "defaultDesktopEnvironment",
    "initSystem",
  ];

  return (
    requiredStrings.every((field) => typeof value[field] === "string") &&
    Array.isArray(value.packageManagers) &&
    Array.isArray(value.supportedDesktopEnvironments) &&
    Array.isArray(value.architectures) &&
    Array.isArray(value.targetAudiences) &&
    Array.isArray(value.tags)
  );
}

export function isDistroInput(value: unknown): value is DistroInput {
  return isRecord(value) && typeof value.slug === "string" && hasDistroFields(value);
}

export function isDistroUpdate(value: unknown): value is DistroUpdate {
  return isRecord(value) && hasDistroFields(value);
}
