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
		<div className="pb-8" onClick={() => setIsExpanded(true)}>
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
