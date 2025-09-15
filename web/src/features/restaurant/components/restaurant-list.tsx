import { RestaurantItem, RestaurantItemSkeleton } from './';
import { useQueryRestaurants } from '../api';

type RestaurantListProps = {
	id: string;
};

function RestaurantList({ id }: RestaurantListProps) {
	const { data, isLoading, isError } = useQueryRestaurants(id);

	if (isLoading) {
		return Array.from({ length: 5 }, (_, i) => (
			<RestaurantItemSkeleton key={i} />
		));
	} else if (!data?.length || isError) {
		return null;
	}

	return data.map((restaurant) => (
		<RestaurantItem key={restaurant.id} restaurant={restaurant} />
	));
}

export default RestaurantList;
