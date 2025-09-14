import { useQuery } from '@tanstack/react-query';
import { trpc } from '@/utils/trpc';

export const useQueryGuideList = () => {
	const query = trpc.guide.item.queryOptions('sds');
	return useQuery(query);
};
