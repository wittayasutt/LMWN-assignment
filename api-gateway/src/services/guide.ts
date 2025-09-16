import { fetchGuideList, fetchGuideItem } from '../api';
import { guideSchema } from '../schemas';

export const getGuideList = async () => {
	const { data: guideIds } = await fetchGuideList();

	return await Promise.all(
		guideIds.map(async (guideId: string) => {
			const { data: guide } = await fetchGuideItem(guideId);
			return guideSchema.parse(guide);
		}),
	);
};

export const getGuideItemById = async (id: string) => {
	const { data: guide } = await fetchGuideItem(id);
	return guideSchema.parse(guide);
};
