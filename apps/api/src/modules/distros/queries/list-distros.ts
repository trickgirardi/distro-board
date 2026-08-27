import {
  and,
  arrayContains,
  asc,
  eq,
  ilike,
  inArray,
  or,
  type SQL,
} from "drizzle-orm";
import { createDb } from "../../../db/client";
import {
  architectureEnum,
  baseFamilyEnum,
  desktopEnvironmentEnum,
  distroArchitectures,
  distroTagEnum,
  distroTags,
  distroTargetAudiences,
  distros,
  packageManagerEnum,
  releaseModelEnum,
  targetAudienceEnum,
} from "../../../db/schema";

type EnumValues<T extends readonly string[]> = T[number];

export type ListDistrosFilters = {
  search?: string;
  base?: EnumValues<typeof baseFamilyEnum.enumValues>;
  releaseModel?: EnumValues<typeof releaseModelEnum.enumValues>;
  desktopEnvironment?: EnumValues<typeof desktopEnvironmentEnum.enumValues>;
  packageManager?: EnumValues<typeof packageManagerEnum.enumValues>;
  architecture?: EnumValues<typeof architectureEnum.enumValues>;
  targetAudience?: EnumValues<typeof targetAudienceEnum.enumValues>;
  tag?: EnumValues<typeof distroTagEnum.enumValues>;
};

function isValidEnumValue<T extends readonly string[]>(
  values: T,
  value: string | undefined,
): value is EnumValues<T> {
  return value !== undefined && (values as readonly string[]).includes(value);
}

export function parseListDistrosFilters(
  query: Record<string, string | undefined>,
): ListDistrosFilters {
  const filters: ListDistrosFilters = {};

  if (query.search) {
    filters.search = query.search;
  }
  if (isValidEnumValue(baseFamilyEnum.enumValues, query.base)) {
    filters.base = query.base;
  }
  if (isValidEnumValue(releaseModelEnum.enumValues, query.releaseModel)) {
    filters.releaseModel = query.releaseModel;
  }
  if (
    isValidEnumValue(
      desktopEnvironmentEnum.enumValues,
      query.desktopEnvironment,
    )
  ) {
    filters.desktopEnvironment = query.desktopEnvironment;
  }
  if (isValidEnumValue(packageManagerEnum.enumValues, query.packageManager)) {
    filters.packageManager = query.packageManager;
  }
  if (isValidEnumValue(architectureEnum.enumValues, query.architecture)) {
    filters.architecture = query.architecture;
  }
  if (isValidEnumValue(targetAudienceEnum.enumValues, query.targetAudience)) {
    filters.targetAudience = query.targetAudience;
  }
  if (isValidEnumValue(distroTagEnum.enumValues, query.tag)) {
    filters.tag = query.tag;
  }

  return filters;
}

export async function listDistros(
  db: ReturnType<typeof createDb>,
  filters: ListDistrosFilters = {},
) {
  const conditions: SQL[] = [];

  if (filters.search) {
    const term = `%${filters.search}%`;
    conditions.push(
      or(ilike(distros.name, term), ilike(distros.shortDescription, term))!,
    );
  }

  if (filters.base) {
    conditions.push(eq(distros.baseFamily, filters.base));
  }

  if (filters.releaseModel) {
    conditions.push(eq(distros.releaseModel, filters.releaseModel));
  }

  if (filters.desktopEnvironment) {
    conditions.push(
      or(
        eq(distros.defaultDesktopEnvironment, filters.desktopEnvironment),
        arrayContains(distros.supportedDesktopEnvironments, [
          filters.desktopEnvironment,
        ]),
      )!,
    );
  }

  if (filters.packageManager) {
    conditions.push(
      arrayContains(distros.packageManagers, [filters.packageManager]),
    );
  }

  if (filters.architecture) {
    conditions.push(
      inArray(
        distros.id,
        db
          .select({ distroId: distroArchitectures.distroId })
          .from(distroArchitectures)
          .where(eq(distroArchitectures.architecture, filters.architecture)),
      ),
    );
  }

  if (filters.targetAudience) {
    conditions.push(
      inArray(
        distros.id,
        db
          .select({ distroId: distroTargetAudiences.distroId })
          .from(distroTargetAudiences)
          .where(
            eq(distroTargetAudiences.targetAudience, filters.targetAudience),
          ),
      ),
    );
  }

  if (filters.tag) {
    conditions.push(
      inArray(
        distros.id,
        db
          .select({ distroId: distroTags.distroId })
          .from(distroTags)
          .where(eq(distroTags.tag, filters.tag)),
      ),
    );
  }

  const query = db.select().from(distros).orderBy(asc(distros.name));

  if (conditions.length === 0) {
    return query;
  }

  return query.where(and(...conditions));
}
