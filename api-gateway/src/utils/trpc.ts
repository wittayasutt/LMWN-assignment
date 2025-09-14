import { initTRPC, TRPCError } from '@trpc/server';
import type { Context } from '../types/trpc.js';

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

// Protected procedure example
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
	if (!ctx.user) {
		throw new TRPCError({ code: 'UNAUTHORIZED' });
	}

	return next({ ctx: { ...ctx, user: ctx.user } });
});

export const createTRPCRouter = t.router;
