import { fetchGuideList, fetchGuideItem } from '../api';
import { PAGE_SIZE } from '../const';
import { guideSchema } from '../schemas';

export const getGuideList = async () => {
	const { data: guideIds } = await fetchGuideList();

	// TODO: Implement pagination
	const filteredGuideIds = guideIds.filter(
		(id: string, index: number) => id && index < PAGE_SIZE,
	);

	const response = await Promise.allSettled(
		filteredGuideIds.map(async (guideId: string) => {
			const { data: guide } = await fetchGuideItem(guideId);
			return guideSchema.parse(guide);
		}),
	);

	return response
		.filter((item) => item.status === 'fulfilled')
		.map((item) => item.value);
};

export const getGuideItemById = async (id: string) => {
	const { data: guide } = await fetchGuideItem(id);
	return guideSchema.parse(guide);
};
