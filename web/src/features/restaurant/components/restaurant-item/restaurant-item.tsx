import { BadgeCheck } from 'lucide-react';
import type { RestaurantType, RestaurantSocialType } from '@/types';

import {
	RestaurantItemDetail,
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
					{restaurant?.name ? (
						<div className="flex flex-row items-center gap-2">
							<h4 className="text-xl leading-relaxed sm:text-2xl">
								{restaurant?.name ?? ''}
							</h4>
							{restaurant?.official ? (
								<BadgeCheck className="text-green-500" size={24} />
							) : null}
						</div>
					) : null}
					<RestaurantItemReview
						numberOfReviews={restaurant?.numberOfReviews}
						rating={restaurant?.rating}
					/>
				</div>
				<RestaurantItemSocial social={social} />
			</div>
			{restaurant?.description ? (
				<p className="pb-8 leading-relaxed">{restaurant?.description ?? ''}</p>
			) : null}
			<RestaurantItemDetail restaurant={restaurant} />
		</div>
	);
}

export default RestaurantItem;
