import { Link } from 'react-router';
import { Button } from '@/components/ui/button';

function NotFoundPage() {
	return (
		<div className="min-h-screen bg-gray-200">
			<div className="container mx-auto text-center">
				<h1 className="mb-4 mt-12 text-4xl font-bold">Page Not Found</h1>
				<p className="mb-12 text-lg text-gray-700">
					The page you're looking for doesn't exist or has been moved.
				</p>
				<Link to="/">
					<Button className="cursor-pointer" size="lg">
						Go Back Home
					</Button>
				</Link>
			</div>
		</div>
	);
}

export default NotFoundPage;
