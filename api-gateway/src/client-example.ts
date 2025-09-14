import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from './routes/index.js';

// Create a tRPC client
const trpc = createTRPCProxyClient<AppRouter>({
	links: [
		httpBatchLink({
			url: 'http://localhost:3001/api/trpc',
		}),
	],
});

// Example usage (uncomment to test)
export async function testClient() {
	try {
		console.log('Testing tRPC client...');

		// Test hello query
		const greeting = await trpc.example.hello.query({ name: 'tRPC' });
		console.log('Greeting:', greeting);
		// Test create mutation
		const created = await trpc.example.create.mutate({
			title: 'Test Item',
			content: 'This is a test item created via tRPC',
		});
		console.log('Created:', created);

		// Test list query
		const list = await trpc.example.list.query({ limit: 5, offset: 0 });
		console.log('List:', list);

		console.log('✅ All tests passed!');
	} catch (error) {
		console.error('❌ Test failed:', error);
	}
}

// Uncomment the line below to run the test
// testClient();

export { trpc };
