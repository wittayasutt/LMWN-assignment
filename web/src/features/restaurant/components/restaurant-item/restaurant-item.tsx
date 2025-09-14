import { RestaurantItemPhotos, RestaurantItemSocial } from '.';

import type { RestaurantType, RestaurantSocialType } from '@/types';

type RestaurantItemProps = {
	restaurant: RestaurantType;
};

function RestaurantItem({ restaurant }: RestaurantItemProps) {
	const social: RestaurantSocialType = {
		facebook: restaurant?.facebook,
		instagram: restaurant?.instagram,
	};

	return (
		<div>
			<RestaurantItemPhotos
				alt={restaurant?.name ?? ''}
				photos={restaurant?.photos ?? []}
			/>
			<div className="my-2 flex flex-row justify-between">
				<div className="flex flex-1 flex-row items-end">
					{restaurant?.name ? (
						<h4 className="leading-none">{restaurant?.name ?? ''}</h4>
					) : null}
					{restaurant?.rating ? (
						<p className="font-title ml-1 text-sm leading-none text-gray-500">
							(rating {restaurant?.rating ?? ''})
						</p>
					) : null}
				</div>
				<RestaurantItemSocial social={social} />
			</div>
			{restaurant?.description ? <p>{restaurant?.description ?? ''}</p> : null}
			{restaurant?.phoneNo ? (
				<p className="font-title">ติดต่อ: {restaurant?.phoneNo ?? ''}</p>
			) : null}
			{restaurant?.address ? (
				<p className="font-title">ที่อยู่: {restaurant?.address ?? ''}</p>
			) : null}
		</div>
	);
}

export default RestaurantItem;
