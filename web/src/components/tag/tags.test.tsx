import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import Tags from './tags';

describe('Tags', () => {
	it('renders tags correctly', () => {
		const tags = ['Guide', 'Restaurant', 'LMWN'];

		render(<Tags tags={tags} />);

		expect(screen.getByText('Guide')).toBeInTheDocument();
		expect(screen.getByText('Restaurant')).toBeInTheDocument();
		expect(screen.getByText('LMWN')).toBeInTheDocument();
	});

	it('handles single tag', () => {
		const tags = ['Guide'];

		render(<Tags tags={tags} />);

		expect(screen.getByText('Guide')).toBeInTheDocument();
	});

	it('removes duplicate tags', () => {
		const tags = ['Guide', 'Guide', 'Restaurant', 'Guide', 'LMWN'];

		render(<Tags tags={tags} />);

		const reactElements = screen.getAllByText('Guide');
		expect(reactElements).toHaveLength(1);
		expect(screen.getByText('Restaurant')).toBeInTheDocument();
		expect(screen.getByText('LMWN')).toBeInTheDocument();
	});

	it('handles empty strings in tags array', () => {
		const tags = ['Guide', '', 'Restaurant', ''];

		render(<Tags tags={tags} />);

		expect(screen.getByText('Guide')).toBeInTheDocument();
		expect(screen.getByText('Restaurant')).toBeInTheDocument();

		const badges = screen.getAllByRole('generic');
		const badgeElements = badges.filter(
			(el) => el.getAttribute('data-slot') === 'badge',
		);
		expect(badgeElements).toHaveLength(2);
	});

	it('returns null for empty array', () => {
		const { container } = render(<Tags tags={[]} />);

		expect(container.firstChild).toBeNull();
	});

	it('applies default variant when not specified', () => {
		const tags = ['Guide'];

		render(<Tags tags={tags} />);

		const badge = screen.getByText('Guide');
		expect(badge).toHaveAttribute('data-slot', 'badge');
	});

	it('applies custom variant when specified', () => {
		const tags = ['Guide'];

		render(<Tags tags={tags} variant="secondary" />);

		const badge = screen.getByText('Guide');
		expect(badge).toHaveAttribute('data-slot', 'badge');
	});
});
