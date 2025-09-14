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
