import type { Request, Response } from 'express';

export const errorHandler = (error: Error, _req: Request, res: Response) => {
	console.error(`Error occured: ${(error as Error).message}`);

	// Don't leak error details in production
	const isDevelopment = process.env.NODE_ENV === 'development';

	res.status(500).json({
		error: 'Internal Server Error',
		message: isDevelopment ? error.message : 'Something went wrong',
		...(isDevelopment && { stack: error.stack }),
	});
};
