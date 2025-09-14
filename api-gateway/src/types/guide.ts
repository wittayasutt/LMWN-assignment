import { z } from 'zod';
import { guideDetailSchema, guideListSchema, guideSchema } from '../schemas';

export type GuideType = z.infer<typeof guideSchema>;
export type GuideListType = z.infer<typeof guideListSchema>;
export type GuideDetailType = z.infer<typeof guideDetailSchema>;
