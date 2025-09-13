import type { PhotoType } from '@/types';

export type GuideType = {
	id: string;
	title: string;
	socialTitle: string;
	shortDescription: string;
	description: string;
	coverPhoto: PhotoType;
	tags: string[];
	writeDate: string;
	createdAt: string;
	updatedAt: string;
};
