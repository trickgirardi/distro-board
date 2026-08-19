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
