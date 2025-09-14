import { z } from 'zod';
import { router, publicProcedure, protectedProcedure } from '../utils/trpc';

export const exampleRouter = router({
	hello: publicProcedure
		.input(z.object({ name: z.string().optional() }))
		.query(({ input }) => {
			return {
				greeting: `Hello ${input.name ?? 'World'}!`,
				timestamp: new Date().toISOString(),
			};
		}),

	create: publicProcedure
		.input(
			z.object({
				title: z.string().min(1, 'Title is required'),
				content: z.string().optional(),
			}),
		)
		.mutation(async ({ input }) => {
			// Simulate async operation
			await new Promise((resolve) => setTimeout(resolve, 100));

			return {
				id: Math.random().toString(36).substr(2, 9),
				title: input.title,
				content: input.content || '',
				createdAt: new Date().toISOString(),
			};
		}),

	protected: protectedProcedure
		.input(z.object({ message: z.string() }))
		.query(({ ctx, input }) => {
			return {
				message: `Protected message: ${input.message}`,
				user: ctx.user,
				timestamp: new Date().toISOString(),
			};
		}),

	list: publicProcedure
		.input(
			z.object({
				limit: z.number().min(1).max(100).default(10),
				offset: z.number().min(0).default(0),
			}),
		)
		.query(({ input }) => {
			const items = Array.from({ length: input.limit }, (_, i) => ({
				id: i + input.offset + 1,
				title: `Item ${i + input.offset + 1}`,
				createdAt: new Date().toISOString(),
			}));

			return {
				items,
				total: 50, // Mock total
				hasMore: input.offset + input.limit < 50,
			};
		}),
});
