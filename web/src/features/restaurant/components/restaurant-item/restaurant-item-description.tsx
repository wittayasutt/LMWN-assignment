import clsx from 'clsx';
import { useState } from 'react';

type RestaurantItemDescriptionProps = {
	description?: string | null;
};

function RestaurantItemDescription({
	description,
}: RestaurantItemDescriptionProps) {
	const [isExpanded, setIsExpanded] = useState<boolean>(false);

	if (!description) {
		return null;
	}

	return (
		<div
			className={clsx('pb-8', isExpanded ? '' : 'cursor-pointer')}
			onClick={() => setIsExpanded(true)}
		>
			<p
				className={clsx(
					'leading-relaxed',
					isExpanded ? 'line-clamp-none' : 'line-clamp-5',
				)}
			>
				{description}
			</p>
		</div>
	);
}

export default RestaurantItemDescription;
