import { BrowserRouter, MemoryRouter } from 'react-router';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render } from '@testing-library/react';

import ScrollToTop from './scroll-to-top';

describe('ScrollToTop', () => {
	const mockScrollTo = vi.fn();

	beforeEach(() => {
		if (typeof window !== 'undefined') {
			Object.defineProperty(window, 'scrollTo', {
				value: mockScrollTo,
				writable: true,
			});
		}
		mockScrollTo.mockClear();
	});

	afterEach(() => {
		vi.resetAllMocks();
	});

	it('renders null', () => {
		const { container } = render(
			<BrowserRouter>
				<ScrollToTop />
			</BrowserRouter>,
		);

		expect(container.firstChild).toBeNull();
	});

	it('scrolls to top when component mounts', () => {
		render(
			<MemoryRouter initialEntries={['/initial']}>
				<ScrollToTop />
			</MemoryRouter>,
		);

		expect(mockScrollTo).toHaveBeenCalledWith({
			top: 0,
			left: 0,
			behavior: 'instant',
		});
	});

	it('calls scrollTo with correct parameters', () => {
		render(
			<BrowserRouter>
				<ScrollToTop />
			</BrowserRouter>,
		);

		expect(mockScrollTo).toHaveBeenCalledTimes(1);
		expect(mockScrollTo).toHaveBeenCalledWith({
			top: 0,
			left: 0,
			behavior: 'instant',
		});
	});
});
