import { useQuery } from '@tanstack/react-query';
import { trpc } from '@/utils/trpc';

export const useQueryGuideList = () => {
	const query = trpc.getUser.queryOptions();
	return useQuery(query);
};
