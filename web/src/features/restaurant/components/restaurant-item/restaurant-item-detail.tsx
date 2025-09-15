import { Phone, MapPin } from 'lucide-react';
import { useMemo } from 'react';

import { Tags } from '@/components/tag';
import type { RestaurantType } from '@/types';

type RestaurantItemDetailProps = {
	restaurant: RestaurantType;
};

function RestaurantItemDetail({ restaurant }: RestaurantItemDetailProps) {
	const renderTags = useMemo(() => {
		const tags = [];

		if (restaurant?.categories) tags.push(...restaurant?.categories);
		if (restaurant?.delivery) tags.push('เดลิเวอรี่');
		if (restaurant?.pickup) tags.push('รับที่ร้าน');

		return tags;
	}, [restaurant]);

	if (
		!restaurant?.phoneNo &&
		!restaurant?.address &&
		!restaurant?.categories &&
		!restaurant?.pickup &&
		!restaurant?.delivery
	) {
		return null;
	}

	return (
		<div className="flex flex-col gap-y-2 rounded-lg bg-gray-100 p-4 shadow-sm">
			{restaurant?.phoneNo ? (
				<div className="font-title flex flex-row items-start">
					<p className="flex min-w-20 flex-row items-center gap-2">
						<Phone size={16} />
						ติดต่อ:
					</p>
					<a
						href={`tel:${restaurant?.phoneNo}`}
						className="text-muted-foreground underline"
					>
						{restaurant?.phoneNo}
					</a>
				</div>
			) : null}

			{restaurant?.address ? (
				<div className="font-title flex flex-row items-start">
					<p className="flex min-w-20 flex-row items-center gap-2">
						<MapPin size={16} />
						ที่อยู่:
					</p>
					{restaurant.lat && restaurant.lng ? (
						<a
							href={`https://www.google.com/maps/search/?api=1&query=${restaurant.lat},${restaurant.lng}`}
							className="text-muted-foreground underline"
							target="_blank"
							rel="noopener noreferrer"
						>
							{restaurant?.address}
						</a>
					) : (
						<p>{restaurant?.address}</p>
					)}
				</div>
			) : null}
			{renderTags ? (
				<div className="mt-2">
					<Tags tags={renderTags} />
				</div>
			) : null}
		</div>
	);
}

export default RestaurantItemDetail;
