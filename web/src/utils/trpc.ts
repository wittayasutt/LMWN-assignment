import { QueryClient } from '@tanstack/react-query';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { createTRPCOptionsProxy } from '@trpc/tanstack-react-query';

import type { AppRouter } from '../../../api-gateway/src/routes';

export const queryClient = new QueryClient();

const trpcClient = createTRPCClient<AppRouter>({
	// TODO: change to .env
	links: [httpBatchLink({ url: 'http://localhost:3001' })],
});

export const trpc = createTRPCOptionsProxy<AppRouter>({
	client: trpcClient,
	queryClient,
});
