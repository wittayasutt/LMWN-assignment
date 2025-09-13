import { Link } from 'react-router-dom';

import { Tags } from '@/components/tags';

import type { GuideType } from '../types';

type GuideItemProps = {
	guide: GuideType;
	isTitle?: boolean;
};

function GuideItem({ guide, isTitle = false }: GuideItemProps) {
	const content = (
		<>
			{isTitle ? <h1>{guide.title}</h1> : <h2>{guide.title}</h2>}
			<div className="flex justify-end">
				<Tags tags={guide.tags} />
			</div>
			<img
				className="w-full"
				src={guide.coverPhoto.smallUrl}
				srcSet={`${guide.coverPhoto.smallUrl} 854w, ${guide.coverPhoto.largeUrl} 1920w`}
				sizes="(max-width: 1080px) 854px, 1920px"
				alt={guide.title}
				loading={isTitle ? 'eager' : 'lazy'}
			/>
			<p>{guide.description}</p>
		</>
	);

	if (isTitle) {
		return content;
	}

	return <Link to={`/guide/${guide.id}`}>{content}</Link>;
}

export default GuideItem;
