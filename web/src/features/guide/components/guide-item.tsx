import { Link } from 'react-router-dom';

import { Tags } from '@/components/tag';
import { Button } from '@/components/ui/button';

import type { GuideType } from '@/types';

type GuideItemProps = {
	guide: GuideType;
	isTitle?: boolean;
};

function GuideItem({ guide, isTitle = false }: GuideItemProps) {
	const titleClass = 'text-3xl font-medium mx-auto text-center mb-4';

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
			<div className="my-10 w-full overflow-hidden rounded-lg">
				{guide?.coverPhoto?.smallUrl || guide?.coverPhoto?.largeUrl ? (
					<img
						className="w-full"
						src={guide?.coverPhoto?.smallUrl ?? ''}
						srcSet={`${guide?.coverPhoto?.smallUrl ?? ''} 854w, ${guide?.coverPhoto?.largeUrl ?? ''} 1920w`}
						sizes="(max-width: 1080px) 854px, 1920px"
						alt={guide?.title ?? ''}
						loading={isTitle ? 'eager' : 'lazy'}
					/>
				) : null}
				{guide?.description ? (
					<p className="text-md bg-gray-100 p-4 pb-8 leading-relaxed">
						{guide.description}
					</p>
				) : null}
			</div>
		</>
	);

	if (isTitle) {
		return content;
	}

	return (
		<Link to={guide?.id ? `/guide/${guide.id}` : '/'}>
			<div className="shadow-xs mb-10 rounded-lg bg-white p-4 pt-16 transition-all duration-200 hover:shadow-md">
				{content}
				<div className="my-4 flex justify-center">
					<Button className="font-title cursor-pointer">อ่านเพิ่มเติม</Button>
				</div>
			</div>
		</Link>
	);
}

export default GuideItem;
