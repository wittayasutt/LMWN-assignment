import { BadgeCheck } from 'lucide-react';

type RestaurantItemNameProps = {
	name: string;
	isOfficial?: boolean;
};

function RestaurantItemName({ name, isOfficial }: RestaurantItemNameProps) {
	if (!name) {
		return null;
	}

	return (
		<div className="flex flex-row items-center gap-2">
			<h4 className="text-xl leading-relaxed sm:text-2xl">{name}</h4>
			{isOfficial ? (
				<BadgeCheck
					className="text-green-500"
					size={24}
					data-testid="badge-check-icon"
				/>
			) : null}
		</div>
	);
}

export default RestaurantItemName;
