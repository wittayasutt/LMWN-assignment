import { z } from 'zod';
import { photoSchema } from '../schemas';

export type PhotoType = z.infer<typeof photoSchema>;
