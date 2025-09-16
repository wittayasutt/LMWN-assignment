import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import RestaurantItemReview from './restaurant-item-review';

describe('RestaurantItemReview', () => {
	it('renders rating when numberOfReviews is not provided but rating exists', () => {
		render(<RestaurantItemReview rating={4.5} />);

		expect(screen.getByText('คะแนนเฉลี่ย 4.5 / 5')).toBeInTheDocument();
	});

	it('renders rating when numberOfReviews is null but rating exists', () => {
		render(<RestaurantItemReview numberOfReviews={null} rating={4.5} />);

		expect(screen.getByText('คะแนนเฉลี่ย 4.5 / 5')).toBeInTheDocument();
	});

	it('renders nothing when numberOfReviews is 0', () => {
		const { container } = render(
			<RestaurantItemReview numberOfReviews={0} rating={4.5} />,
		);

		expect(container.firstChild).toBeNull();
	});

	it('renders nothing when numberOfReviews is negative', () => {
		const { container } = render(
			<RestaurantItemReview numberOfReviews={-1} rating={4.5} />,
		);

		expect(container.firstChild).toBeNull();
	});

	it('renders nothing when rating is not provided', () => {
		const { container } = render(<RestaurantItemReview numberOfReviews={10} />);

		expect(container.firstChild).toBeNull();
	});

	it('renders nothing when rating is null', () => {
		const { container } = render(
			<RestaurantItemReview numberOfReviews={10} rating={null} />,
		);

		expect(container.firstChild).toBeNull();
	});

	it('renders rating when both numberOfReviews and rating are valid', () => {
		const numberOfReviews = 25;
		const rating = 4.2;

		render(
			<RestaurantItemReview
				numberOfReviews={numberOfReviews}
				rating={rating}
			/>,
		);

		expect(screen.getByText('คะแนนเฉลี่ย 4.2 / 5')).toBeInTheDocument();
	});

	it('renders correct rating format with whole number', () => {
		render(<RestaurantItemReview numberOfReviews={15} rating={5} />);

		expect(screen.getByText('คะแนนเฉลี่ย 5 / 5')).toBeInTheDocument();
	});
});
