import clsx from 'clsx';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Tags } from '@/components/tag';
import { Button } from '@/components/ui/button';

import type { GuideType } from '@/types';

type GuideItemProps = {
	guide: GuideType;
	isTitle?: boolean;
};

function GuideItem({ guide, isTitle = false }: GuideItemProps) {
	const [isExpanded, setIsExpanded] = useState<boolean>(false);

	const titleClass =
		'text-2xl font-medium mx-auto text-center mb-4 sm:text-3xl';

	const content = (
		<>
			{isTitle ? (
				<h1 className={titleClass}>{guide?.title ?? ''}</h1>
			) : (
				<h2 className={titleClass}>{guide?.title ?? ''}</h2>
			)}
			{guide?.tags ? (
				<div className="flex justify-center">
					<Tags tags={guide?.tags} variant="secondary" />
				</div>
			) : null}
			<div className="my-8 w-full overflow-hidden rounded-lg sm:my-10">
				{guide?.coverPhoto?.smallUrl || guide?.coverPhoto?.largeUrl ? (
					<img
						className="aspect-[16/9] w-full bg-gray-200"
						src={guide?.coverPhoto?.smallUrl ?? ''}
						srcSet={`${guide?.coverPhoto?.smallUrl ?? ''} 854w, ${guide?.coverPhoto?.largeUrl ?? ''} 1920w`}
						sizes="(max-width: 1080px) 854px, 1920px"
						alt={guide?.title ?? ''}
						loading={isTitle ? 'eager' : 'lazy'}
					/>
				) : null}
				{guide?.description ? (
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
							{guide.description}
						</p>
					</div>
				) : null}
			</div>
		</>
	);

	if (isTitle) {
		return content;
	}

	return (
		<Link to={guide?.id ? `/guide/${guide.id}` : '/'}>
			<div className="border-1 mb-8 rounded-lg border-gray-200 bg-white p-4 pt-8 transition-all duration-200 hover:shadow-md sm:mb-12 sm:pt-16">
				{content}
				<div className="my-2 flex justify-center sm:my-4">
					<Button className="font-title cursor-pointer">อ่านเพิ่มเติม</Button>
				</div>
			</div>
		</Link>
	);
}

export default GuideItem;
