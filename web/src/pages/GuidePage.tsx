import { Link, useParams } from 'react-router-dom';

function GuidePage() {
	const { id } = useParams<{ id: string }>();

	return (
		<div className="min-h-screen bg-gray-50 p-8">
			<div className="mx-auto max-w-4xl">
				<h1 className="mb-8 text-4xl font-bold text-gray-900">Guide Page</h1>
				<p className="mb-4 text-lg text-gray-700">
					This is your guide page with helpful information and instructions.
				</p>
				<p className="mb-8 text-xl font-semibold text-blue-600">
					Guide ID: {id}
				</p>
				<Link
					to="/"
					className="inline-block rounded-lg bg-green-600 px-6 py-3 font-medium text-white transition-colors hover:bg-green-700"
				>
					Back to Main Page
				</Link>
			</div>
		</div>
	);
}

export default GuidePage;
