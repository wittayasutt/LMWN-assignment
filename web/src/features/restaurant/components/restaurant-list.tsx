import RestaurantItem from './restaurant-item';
import { useQueryRestaurants } from '../api';

type RestaurantListProps = {
	id: string;
};

function RestaurantList({ id }: RestaurantListProps) {
	const { data, isLoading, isError } = useQueryRestaurants(id);

	if (isLoading) {
		return <div>Loading...</div>;
	} else if (!data?.length || isError) {
		return null;
	}

	return data.map((restaurant) => (
		<RestaurantItem key={restaurant.id} restaurant={restaurant} />
	));
}

export default RestaurantList;
