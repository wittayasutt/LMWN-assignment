import { Link } from 'react-router';

import { Tags } from '@/components/tag';
import { Button } from '@/components/ui/button';
import type { GuideType } from '@/types';

import { GuideItemDescription, GuideItemPhoto } from './';

type GuideItemProps = {
	guide: GuideType;
	isTitle?: boolean;
	isPriority?: boolean;
};

function GuideItem({
	guide,
	isTitle = false,
	isPriority = false,
}: GuideItemProps) {
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
				<GuideItemPhoto
					alt={guide?.title}
					photo={guide?.coverPhoto}
					isTitle={isTitle}
					isPriority={isPriority}
				/>
				<GuideItemDescription
					description={guide?.description}
					isTitle={isTitle}
				/>
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
