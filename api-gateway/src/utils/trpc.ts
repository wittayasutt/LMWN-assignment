import { initTRPC } from '@trpc/server';
import type { CreateExpressContextOptions } from '@trpc/server/adapters/express';

export const createContext = ({ req, res }: CreateExpressContextOptions) => {
	const getUser = () => {
		// Add your authentication logic here
		return null;
	};

	return {
		req,
		res,
		user: getUser(),
	};
};

export type Context = Awaited<ReturnType<typeof createContext>>;

export const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
