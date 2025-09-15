import type { RestaurantType, RestaurantSocialType } from '@/types';

import {
	RestaurantItemDescription,
	RestaurantItemDetail,
	RestaurantItemName,
	RestaurantItemPhotos,
	RestaurantItemReview,
	RestaurantItemSocial,
} from '.';

type RestaurantItemProps = {
	restaurant: RestaurantType;
};

function RestaurantItem({ restaurant }: RestaurantItemProps) {
	const social: RestaurantSocialType = {
		instagram: restaurant?.instagram,
		facebook: restaurant?.facebook,
		url: restaurant?.url,
	};

	return (
		<div className="mb-24 sm:mb-32">
			<RestaurantItemPhotos
				className="mb-4"
				alt={restaurant?.name ?? ''}
				photos={restaurant?.photos ?? []}
			/>
			<div className="mb-4 flex flex-row items-start justify-between">
				<div>
					<RestaurantItemName
						name={restaurant?.name}
						isOfficial={restaurant?.official ?? false}
					/>
					<RestaurantItemReview
						numberOfReviews={restaurant?.numberOfReviews}
						rating={restaurant?.rating}
					/>
				</div>
				<RestaurantItemSocial social={social} />
			</div>
			<RestaurantItemDescription description={restaurant?.description} />
			<RestaurantItemDetail restaurant={restaurant} />
		</div>
	);
}

export default RestaurantItem;
