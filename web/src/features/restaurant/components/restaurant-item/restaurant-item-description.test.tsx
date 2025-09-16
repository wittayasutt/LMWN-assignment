import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import RestaurantItemDescription from './restaurant-item-description';

describe('RestaurantItemDescription', () => {
	it('renders nothing when description is null', () => {
		const { container } = render(
			<RestaurantItemDescription description={null} />,
		);

		expect(container.firstChild).toBeNull();
	});

	it('renders nothing when description is undefined', () => {
		const { container } = render(
			<RestaurantItemDescription description={undefined} />,
		);

		expect(container.firstChild).toBeNull();
	});

	it('renders description text when provided', () => {
		const description = 'This is a great restaurant with amazing food.';

		render(<RestaurantItemDescription description={description} />);

		expect(screen.getByText(description)).toBeInTheDocument();
	});

	it('applies line-clamp-5 class by default', () => {
		const description = 'This is a great restaurant with amazing food.';

		render(<RestaurantItemDescription description={description} />);

		const paragraph = screen.getByText(description);
		expect(paragraph).toHaveClass('line-clamp-5');
		expect(paragraph).not.toHaveClass('line-clamp-none');
	});

	it('expands description when clicked', async () => {
		const user = userEvent.setup();
		const description = 'This is a great restaurant with amazing food.';

		render(<RestaurantItemDescription description={description} />);

		const container = screen.getByText(description).closest('div');
		const paragraph = screen.getByText(description);

		expect(paragraph).toHaveClass('line-clamp-5');

		await user.click(container!);

		expect(paragraph).toHaveClass('line-clamp-none');
		expect(paragraph).not.toHaveClass('line-clamp-5');
	});
});
