import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { PhotoType } from '@/types';

import RestaurantItemPhoto from './restaurant-item-photo';

const mockPhoto: PhotoType = {
	id: '1',
	smallUrl: 'https://example.com/small.jpg',
	largeUrl: 'https://example.com/large.jpg',
};

const mockPhotoNoUrls: PhotoType = {
	id: '2',
	smallUrl: null,
	largeUrl: null,
};

describe('RestaurantItemPhoto', () => {
	it('renders nothing when photo has no URLs', () => {
		const { container } = render(
			<RestaurantItemPhoto
				photo={mockPhotoNoUrls}
				alt="Restaurant photo"
				index={0}
			/>,
		);

		expect(container.firstChild).toBeNull();
	});

	it('renders image with correct attributes', () => {
		render(
			<RestaurantItemPhoto
				photo={mockPhoto}
				alt="Restaurant photo"
				index={0}
			/>,
		);

		const imageElement = screen.getByAltText(/Restaurant photo-1/i);
		expect(imageElement).toBeInTheDocument();
		expect(imageElement).toHaveAttribute(
			'src',
			'https://example.com/small.jpg',
		);
	});

	it('opens dialog when clicked', async () => {
		const user = userEvent.setup();

		render(
			<RestaurantItemPhoto
				photo={mockPhoto}
				alt="Restaurant photo"
				index={0}
			/>,
		);

		const triggerImage = screen.getByAltText(/Restaurant photo-1/i);
		await user.click(triggerImage);

		const dialogImage = screen.getByAltText('Restaurant photo');
		expect(dialogImage).toBeInTheDocument();
	});
});
