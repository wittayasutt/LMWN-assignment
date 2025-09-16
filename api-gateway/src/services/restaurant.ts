import { fetchGuideItem, fetchGuideItemDetail, fetchRestaurant } from '../api';
import { restaurantSchema } from '../schemas';

export const getRestaurantItemsByGuideId = async (id: string) => {
	const { data: guide } = await fetchGuideItem(id);

	return await Promise.all(
		guide?.items?.map(async (guideItemId: string) => {
			const { data: guideItem } = await fetchGuideItemDetail(guideItemId);
			const { data: restaurant } = await fetchRestaurant(
				guideItem.restaurantId,
			);

			return restaurantSchema.parse({ ...guideItem, ...restaurant });
		}),
	);
};
