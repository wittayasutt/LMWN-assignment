import { Link } from 'react-router-dom';

import { Tags } from '@/components/tags';
import { Button } from '@/components/ui/button';

import { useQueryGuildList } from '../api/use-query-guide-lis';
import type { GuideType } from '../types';

type GuideItemProps = {
	guide: GuideType;
	isTitle?: boolean;
};

function GuideItem({ guide, isTitle = false }: GuideItemProps) {
	const { data } = useQueryGuildList();

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

	return (
		<Link to={`/guide/${guide.id}`}>
			{content}
			<div className="mb-8 mt-4 flex justify-center">
				<Button className="font-title cursor-pointer">อ่านเพิ่มเติม</Button>
			</div>
		</Link>
	);
}

export default GuideItem;
