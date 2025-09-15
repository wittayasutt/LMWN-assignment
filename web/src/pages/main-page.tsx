import { GuideList } from '@/features/guide/components';

function MainPage() {
	return (
		<div className="min-h-screen">
			<div className="container">
				<h1 className="mx-auto pb-12 pt-4 text-center text-3xl font-medium sm:pb-16 sm:pt-12 sm:text-4xl">
					รวมลายแทง
				</h1>
				<GuideList />
			</div>
		</div>
	);
}

export default MainPage;
