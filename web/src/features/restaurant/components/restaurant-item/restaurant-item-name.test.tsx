import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import RestaurantItemName from './restaurant-item-name';

describe('RestaurantItemName', () => {
	it('renders nothing when name is empty string', () => {
		const { container } = render(<RestaurantItemName name="" />);

		expect(container.firstChild).toBeNull();
	});

	it('renders restaurant name when provided', () => {
		const restaurantName = 'Amazing Pizza Place';

		render(<RestaurantItemName name={restaurantName} />);
		expect(screen.getByText(restaurantName)).toBeInTheDocument();
	});

	it('displays BadgeCheck icon when restaurant is official', () => {
		const restaurantName = 'Official Restaurant';

		render(<RestaurantItemName name={restaurantName} isOfficial />);

		const badgeIcon = screen.getByTestId('badge-check-icon');
		expect(badgeIcon).toBeInTheDocument();
	});

	it('does not display BadgeCheck icon when restaurant is not official', () => {
		const restaurantName = 'Regular Restaurant';

		render(<RestaurantItemName name={restaurantName} />);

		const badgeIcon = screen.queryByTestId('badge-check-icon');
		expect(badgeIcon).not.toBeInTheDocument();
	});
});
