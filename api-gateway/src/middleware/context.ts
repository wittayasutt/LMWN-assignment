import type { CreateExpressContextOptions } from '@trpc/server/adapters/express';

export const createContext = ({ req, res }: CreateExpressContextOptions) => {
	const getUser = () => {
		// Extract user from JWT token, session, etc.
		// For now, return null (unauthenticated)
		return null;
	};

	return {
		req,
		res,
		user: getUser(),
	};
};
