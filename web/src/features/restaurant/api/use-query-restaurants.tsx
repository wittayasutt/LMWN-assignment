import { useQuery } from '@tanstack/react-query';
import { trpc } from '@/utils/trpc';

export const useQueryRestaurants = (id?: string) => {
	const query = trpc.restaurant.items.queryOptions(id ?? '');
	return useQuery({
		...query,
		enabled: !!id,
	});
};
