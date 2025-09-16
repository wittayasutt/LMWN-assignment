import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { PhotoType } from '@/types';

import RestaurantItemPhotos from './restaurant-item-photos';

const mockPhotos: PhotoType[] = [
	{
		id: '1',
		smallUrl: 'https://example.com/small1.jpg',
		largeUrl: 'https://example.com/large1.jpg',
	},
	{
		id: '2',
		smallUrl: 'https://example.com/small2.jpg',
		largeUrl: 'https://example.com/large2.jpg',
	},
	{
		id: '3',
		smallUrl: 'https://example.com/small3.jpg',
		largeUrl: 'https://example.com/large3.jpg',
	},
];

const mockManyPhotos: PhotoType[] = [
	...mockPhotos,
	{
		id: '4',
		smallUrl: 'https://example.com/small4.jpg',
		largeUrl: 'https://example.com/large4.jpg',
	},
	{
		id: '5',
		smallUrl: 'https://example.com/small5.jpg',
		largeUrl: 'https://example.com/large5.jpg',
	},
];

describe('RestaurantItemPhotos', () => {
	it('renders nothing when photos array is empty', () => {
		const { container } = render(
			<RestaurantItemPhotos alt="Restaurant photos" photos={[]} />,
		);

		expect(container.firstChild).toBeNull();
	});

	it('renders nothing when photos array is undefined', () => {
		const { container } = render(
			<RestaurantItemPhotos alt="Restaurant photos" photos={undefined} />,
		);

		expect(container.firstChild).toBeNull();
	});

	it('renders carousel with photos', () => {
		render(
			<RestaurantItemPhotos alt="Restaurant photos" photos={mockPhotos} />,
		);

		expect(screen.getByRole('region')).toBeInTheDocument();
		expect(screen.getByAltText('Restaurant photos-1')).toBeInTheDocument();
		expect(screen.getByAltText('Restaurant photos-2')).toBeInTheDocument();
		expect(screen.getByAltText('Restaurant photos-3')).toBeInTheDocument();
	});

	it('applies custom className to carousel', () => {
		const { container } = render(
			<RestaurantItemPhotos
				alt="Restaurant photos"
				photos={mockPhotos}
				className="custom-class"
			/>,
		);

		const carousel = container.querySelector('.custom-class');
		expect(carousel).toBeInTheDocument();
	});

	it('does not show navigation controls when photos count is 3 or less', () => {
		render(
			<RestaurantItemPhotos alt="Restaurant photos" photos={mockPhotos} />,
		);

		expect(
			screen.queryByRole('button', { name: /previous/i }),
		).not.toBeInTheDocument();
		expect(
			screen.queryByRole('button', { name: /next/i }),
		).not.toBeInTheDocument();
	});

	it('shows navigation controls when photos count is more than 3', () => {
		render(
			<RestaurantItemPhotos alt="Restaurant photos" photos={mockManyPhotos} />,
		);

		expect(
			screen.getByRole('button', { name: /previous/i }),
		).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
	});

	it('renders each photo with correct index', () => {
		render(
			<RestaurantItemPhotos alt="Restaurant photos" photos={mockPhotos} />,
		);

		mockPhotos.forEach((_, index) => {
			expect(
				screen.getByAltText(`Restaurant photos-${index + 1}`),
			).toBeInTheDocument();
		});
	});
});
