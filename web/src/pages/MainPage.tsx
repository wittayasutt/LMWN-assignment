import { Link } from 'react-router-dom';

function MainPage() {
	return (
		<div className="min-h-screen bg-gray-50 p-8">
			<div className="mx-auto max-w-4xl">
				<h1 className="mb-8 text-4xl font-bold text-gray-900">Main Page</h1>
				<p className="mb-8 text-lg text-gray-700">
					Welcome to the main page of your application.
				</p>
				<div className="space-x-4">
					<Link
						to="/guide/123"
						className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
					>
						Go to Guide 123
					</Link>
					<Link
						to="/guide/abc"
						className="inline-block rounded-lg bg-purple-600 px-6 py-3 font-medium text-white transition-colors hover:bg-purple-700"
					>
						Go to Guide ABC
					</Link>
				</div>
			</div>
		</div>
	);
}

export default MainPage;
