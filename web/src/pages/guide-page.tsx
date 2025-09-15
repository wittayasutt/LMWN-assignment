import { useParams, useNavigate } from 'react-router';

import { BreadcrumbWithCustomSeparator } from '@/components/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { useQueryGuideItem } from '@/features/guide/api';
import { GuideItem, GuideItemSkeleton } from '@/features/guide/components';
import { RestaurantList } from '@/features/restaurant/components';

function GuidePage() {
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();
	const { data: guide, isLoading, isError } = useQueryGuideItem(id);

	if (isLoading) {
		return (
			<div className="container min-h-screen">
				<GuideItemSkeleton />;
			</div>
		);
	} else if (!guide || isError) {
		navigate('/not-found');
		return null;
	}

	return (
		<div className="container min-h-screen">
			<BreadcrumbWithCustomSeparator
				items={[
					{ label: 'รวมลายแทง ร้านลับ', to: '/' },
					{ label: guide?.title ?? '' },
				]}
			/>
			<Separator className="mb-8 mt-4 sm:mb-12" />
			<GuideItem guide={guide} isTitle />
			<div className="sm:my-18 mx-auto my-12 max-w-80">
				<Separator />
			</div>
			{id && <RestaurantList id={id} />}
		</div>
	);
}

export default GuidePage;
