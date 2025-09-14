import { useQuery } from '@tanstack/react-query';
import { trpc } from '@/utils/trpc';

export const useQueryGuildList = () => {
	return useQuery(trpc.example.hello.queryOptions({}));
};
