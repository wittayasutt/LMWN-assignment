import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from '@/pages/main-page';
import GuidePage from '@/pages/guide-page';
import NotFoundPage from '@/pages/not-found-page';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/guide/:id" element={<GuidePage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</Router>
	);
}

export default App;
