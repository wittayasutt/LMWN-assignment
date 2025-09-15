import { BrowserRouter, Routes, Route } from 'react-router';

import { ScrollToTop } from '@/components/scroll-to-top';
import MainPage from '@/pages/main-page';
import GuidePage from '@/pages/guide-page';
import NotFoundPage from '@/pages/not-found-page';

function App() {
	return (
		<BrowserRouter>
			<ScrollToTop />
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/guide/:id" element={<GuidePage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
