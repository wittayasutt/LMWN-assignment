import { GuideItem, GuideItemSkeleton } from './';
import { useQueryGuideList } from '../api';

function GuideList() {
	const { data, isLoading, isError } = useQueryGuideList();

	if (isLoading) {
		return Array.from({ length: 5 }, (_, i) => <GuideItemSkeleton key={i} />);
	} else if (!data?.length || isError) {
		return <p className="font-title text-center">ไม่พบข้อมูลรายแทง</p>;
	}

	return data.map((guide) => <GuideItem key={guide.id} guide={guide} />);
}

export default GuideList;
