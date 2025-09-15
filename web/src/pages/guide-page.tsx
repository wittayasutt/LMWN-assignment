import { useParams, useNavigate } from 'react-router-dom';

import { BreadcrumbWithCustomSeparator } from '@/components/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { useQueryGuideItem } from '@/features/guide/api';
import { GuideItem } from '@/features/guide/components';
import { RestaurantList } from '@/features/restaurant/components';

function GuidePage() {
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();
	const { data: guide, isLoading, isError } = useQueryGuideItem(id);

	if (isLoading) {
		return <div>Loading...</div>;
	} else if (!guide || isError) {
		navigate('/not-found');
		return null;
	}

	return (
		<div className="container min-h-screen">
			<BreadcrumbWithCustomSeparator
				items={[{ label: 'รวมลายแทง', to: '/' }, { label: guide?.title ?? '' }]}
			/>
			<Separator className="mb-12 mt-4" />
			<GuideItem guide={guide} isTitle />
			<div className="mt-18 mx-auto mb-12 max-w-80">
				<Separator />
			</div>
			{id && <RestaurantList id={id} />}
		</div>
	);
}

export default GuidePage;
