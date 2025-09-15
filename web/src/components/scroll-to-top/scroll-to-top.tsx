import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router';

function ScrollToTop() {
	const { pathname } = useLocation();

	useLayoutEffect(() => {
		if (!window) {
			return;
		}

		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'instant',
		});
	}, [pathname]);

	return null;
}

export default ScrollToTop;
