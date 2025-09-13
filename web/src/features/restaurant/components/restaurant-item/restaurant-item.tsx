import { RestaurantItemPhotos, RestaurantItemSocial } from '.';

import type { RestaurantType, RestaurantSocialType } from '../../types';

type RestaurantItemProps = {
	restaurant: RestaurantType;
};

function RestaurantItem({ restaurant }: RestaurantItemProps) {
	const social: RestaurantSocialType = {
		facebook: restaurant.facebook,
		instagram: restaurant.instagram,
	};

	return (
		<div>
			<RestaurantItemPhotos alt={restaurant.name} photos={restaurant.photos} />
			<div className="my-2 flex flex-row justify-between">
				<div className="flex flex-1 flex-row items-end">
					<h4 className="leading-none">{restaurant.name}</h4>
					<p className="ml-1 text-sm leading-none text-gray-500">
						(rating {restaurant.rating})
					</p>
				</div>
				<RestaurantItemSocial social={social} />
			</div>
			<p>{restaurant.description}</p>
			<p>คิดต่อ: {restaurant.phoneNo}</p>
			<p>ที่อยู่: {restaurant.address}</p>
		</div>
	);
}

export default RestaurantItem;
