import { guideSchema } from './schemas';

export type GuideType = z.infer<typeof guideSchema>;
