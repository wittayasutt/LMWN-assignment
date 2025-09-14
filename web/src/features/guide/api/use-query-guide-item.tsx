import { useQuery } from '@tanstack/react-query';
import { trpc } from '@/utils/trpc';

export const useQueryGuideItem = (id?: string) => {
	const query = trpc.guide.item.queryOptions(id ?? '');
	return useQuery({
		...query,
		enabled: !!id,
	});
};
