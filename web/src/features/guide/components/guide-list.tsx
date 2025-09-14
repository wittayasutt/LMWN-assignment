import GuideItem from './guide-item';
import { useQueryGuideList } from '../api';

function GuideList() {
	const { data, isLoading, isError } = useQueryGuideList();

	if (isLoading) {
		return <div>Loading...</div>;
	} else if (!data?.length || isError) {
		return <div>No data</div>;
	}

	return data.map((guide) => <GuideItem key={guide.id} guide={guide} />);
}

export default GuideList;
