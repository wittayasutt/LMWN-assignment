import { GuideList } from '@/features/guide/components';

function MainPage() {
	return (
		<div className="min-h-screen">
			<div className="container">
				<h1 className="mx-auto mb-16 mt-12 text-center text-4xl font-medium">
					รวมลายแทง
				</h1>
				<GuideList />
			</div>
		</div>
	);
}

export default MainPage;
