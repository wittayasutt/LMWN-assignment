import { Link } from 'react-router-dom';

function NotFoundPage() {
	return (
		<div className="min-h-screen bg-gray-50">
			<div className="container">
				<div className="mx-auto max-w-4xl text-center">
					<h1 className="mb-4 text-6xl font-bold text-gray-900">404</h1>
					<h2 className="mb-8 text-3xl font-semibold text-gray-800">
						Page Not Found
					</h2>
					<p className="mb-8 text-lg text-gray-700">
						The page you're looking for doesn't exist or has been moved.
					</p>
					<Link
						to="/"
						className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
					>
						Go Back Home
					</Link>
				</div>
			</div>
		</div>
	);
}

export default NotFoundPage;
