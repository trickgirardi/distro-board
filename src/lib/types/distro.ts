export type DistroPreview = {
	id: string;
	slug: string;
	name: string;
	shortDescription: string;
	logoUrl: string | null;
	homepageUrl: string;
	releaseModel: string;
	baseFamily: string;
	packageManagers: string[];
	defaultDesktopEnvironment: string;
};

export type DistroDetail = DistroPreview & {
	description: string;
	documentationUrl: string | null;
	sourceCodeUrl: string | null;
	supportedDesktopEnvironments: string[];
	initSystem: string;
	architectures: string[];
	targetAudiences: string[];
	tags: string[];
	createdAt: string;
	updatedAt: string;
};
