import { z } from 'zod';
import { PhotoType } from './photo';
import { guideDetailSchema, guideListSchema, guideSchema } from '../schemas';

export type GuideType = z.infer<typeof guideSchema>;
export type GuideListType = z.infer<typeof guideListSchema>;
export type GuideDetailType = z.infer<typeof guideDetailSchema>;

export type GuideListResponseType = string[];
export type GuideItemResponseType = GuideDetailType;
export type GuideItemDetailResponseType = {
	id: string;
	description: string;
	restaurantId: string;
	photos: PhotoType[];
};
