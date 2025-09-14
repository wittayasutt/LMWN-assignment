import { Link } from 'react-router-dom';

import { Tags } from '@/components/tags';
import { Button } from '@/components/ui/button';

import type { GuideType } from '../types';

type GuideItemProps = {
	guide: GuideType;
	isTitle?: boolean;
};

function GuideItem({ guide, isTitle = false }: GuideItemProps) {
	const content = (
		<>
			{isTitle ? <h1>{guide?.title ?? ''}</h1> : <h2>{guide?.title ?? ''}</h2>}
			{guide?.tags?.length > 0 ? (
				<div className="flex justify-end">
					<Tags tags={guide?.tags} />
				</div>
			) : null}
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
			{guide?.description ? <p>{guide.description}</p> : null}
		</>
	);

	if (isTitle) {
		return content;
	}

	return (
		<Link to={guide?.id ? `/guide/${guide.id}` : '/'}>
			{content}
			<div className="mb-8 mt-4 flex justify-center">
				<Button className="font-title cursor-pointer">อ่านเพิ่มเติม</Button>
			</div>
		</Link>
	);
}

export default GuideItem;
