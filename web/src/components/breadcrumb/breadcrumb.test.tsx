import { BrowserRouter } from 'react-router';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import type { ReactElement } from 'react';

import BreadcrumbWithCustomSeparator from './breadcrumb';

const renderWithRouter = (component: ReactElement) => {
	return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('BreadcrumbWithCustomSeparator', () => {
	it('renders single item as page (no actual link)', () => {
		const items = [{ label: 'Home' }];

		renderWithRouter(<BreadcrumbWithCustomSeparator items={items} />);

		const labelElement = screen.getByText(/home/i);
		expect(labelElement).toBeInTheDocument();
		expect(labelElement).toHaveAttribute('aria-current', 'page');
		expect(labelElement.tagName).toBe('SPAN');
	});

	it('renders multiple items with links and separators', () => {
		const items = [
			{ label: 'Home', to: '/' },
			{ label: 'Guides', to: '/guides' },
			{ label: 'Guide Detail' },
		];

		renderWithRouter(<BreadcrumbWithCustomSeparator items={items} />);

		const links = screen.getAllByRole('link');
		const actualLinks = links.filter((link) => link.tagName === 'A');
		expect(actualLinks).toHaveLength(2);
		expect(actualLinks[0]).toHaveAttribute('href', '/');
		expect(actualLinks[1]).toHaveAttribute('href', '/guides');

		const labelElement = screen.getByText('Guide Detail');
		expect(labelElement).toBeInTheDocument();
		expect(labelElement).toHaveAttribute('aria-current', 'page');
		expect(labelElement.tagName).toBe('SPAN');
	});

	it('renders separators between items', () => {
		const items = [
			{ label: 'Home', to: '/' },
			{ label: 'Guides', to: '/guides' },
			{ label: 'Guide Detail' },
		];

		const { container } = renderWithRouter(
			<BreadcrumbWithCustomSeparator items={items} />,
		);

		const separators = container.querySelectorAll('svg');
		expect(separators).toHaveLength(2);
	});

	it('handles empty label gracefully', () => {
		const items = [{ label: '', to: '/' }, { label: 'Guides' }];

		renderWithRouter(<BreadcrumbWithCustomSeparator items={items} />);

		const links = screen.getAllByRole('link');
		const actualLinks = links.filter((link) => link.tagName === 'A');

		expect(actualLinks).toHaveLength(0);
		expect(screen.getByText('Guides')).toBeInTheDocument();
	});

	it('handles missing to property gracefully', () => {
		const items = [{ label: 'Home' }, { label: 'Guides' }];

		renderWithRouter(<BreadcrumbWithCustomSeparator items={items} />);

		const links = screen.getAllByRole('link');
		const actualLinks = links.filter((link) => link.tagName === 'A');

		expect(actualLinks).toHaveLength(1);
		expect(actualLinks[0]).toHaveAttribute('href', '/');
		expect(screen.getByText('Guides')).toBeInTheDocument();
	});

	it('applies correct classes to elements', () => {
		const items = [{ label: 'Home', to: '/' }, { label: 'Guides' }];

		renderWithRouter(<BreadcrumbWithCustomSeparator items={items} />);

		const links = screen.getAllByRole('link');
		const actualLink = links.find((link) => link.tagName === 'A');
		const page = screen.getByText('Guides');

		expect(actualLink).toHaveClass('font-title');
		expect(page).toHaveClass('font-title');
	});
});
