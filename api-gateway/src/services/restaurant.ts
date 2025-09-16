import { fetchGuideItem, fetchGuideItemDetail, fetchRestaurant } from '../api';
import { PAGE_SIZE } from '../const';
import { restaurantSchema } from '../schemas';

export const getRestaurantItemsByGuideId = async (id: string) => {
	const { data: guide } = await fetchGuideItem(id);

	// TODO: Implement pagination
	const filteredGuideItemIds = guide?.items?.filter(
		(id: string, index: number) => id && index < PAGE_SIZE,
	);

	return await Promise.all(
		filteredGuideItemIds?.map(async (guideItemId: string) => {
			const { data: guideItem } = await fetchGuideItemDetail(guideItemId);
			const { data: restaurant } = await fetchRestaurant(
				guideItem.restaurantId,
			);

			return restaurantSchema.parse({ ...guideItem, ...restaurant });
		}),
	);
};
