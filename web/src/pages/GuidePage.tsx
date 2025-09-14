import { Link, useParams, useNavigate } from 'react-router-dom';

import { Separator } from '@/components/ui/separator';
import GuideItem from '@/features/guide/components/guide-item';
import RestaurantList from '@/features/restaurant/components/restaurant-list';

import { useQueryGuideItem } from '@/features/guide/api';

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
			<Link to="/" className="font-title">
				ไปหน้าหลัก
			</Link>
			<GuideItem guide={guide} isTitle />
			<Separator className="my-8" />
			<RestaurantList />
		</div>
	);
}

export default GuidePage;
