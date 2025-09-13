import { Photo } from '@/types';

export type Guide = {
	id: string;
	title: string;
	socialTitle: string;
	shortDescription: string;
	description: string;
	coverPhoto: Photo;
	tags: string[];
	writeDate: string;
	createdAt: string;
	updatedAt: string;
};
