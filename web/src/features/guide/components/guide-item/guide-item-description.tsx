import clsx from 'clsx';
import { useState } from 'react';

type GuideItemDescriptionProps = {
	description?: string | null;
	isTitle?: boolean;
};

function GuideItemDescription({
	description,
	isTitle = false,
}: GuideItemDescriptionProps) {
	const [isExpanded, setIsExpanded] = useState<boolean>(false);

	if (!description) {
		return null;
	}

	return (
		<div
			className="bg-gray-100 p-4 pb-8"
			onClick={() => {
				if (isTitle) setIsExpanded(true);
			}}
		>
			<p
				className={clsx(
					'text-md leading-relaxed',
					isExpanded ? 'line-clamp-none' : 'line-clamp-5',
				)}
			>
				{description}
			</p>
		</div>
	);
}

export default GuideItemDescription;
