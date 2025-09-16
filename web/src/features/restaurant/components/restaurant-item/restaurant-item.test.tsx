import { describe, it, expect } from 'vitest';
import { mockRestaurant } from '@/mock';
import { render, screen } from '@testing-library/react';
import type { RestaurantType } from '@/types';

import RestaurantItem from './restaurant-item';

describe('RestaurantItem', () => {
	it('renders restaurant with complete data', () => {
		render(<RestaurantItem restaurant={mockRestaurant} />);

		expect(screen.getByText('ONIBUS COFFEE')).toBeInTheDocument();
		expect(
			screen.getByText('ONI BUS ร้านสุดลับซ่อนตัวอยู่ที่ไหนก็ไม่รู้'),
		).toBeInTheDocument();
	});

	it('renders with minimal restaurant data', () => {
		const minimalRestaurant: RestaurantType = {
			id: '2',
			name: 'Minimal Restaurant',
		};

		render(<RestaurantItem restaurant={minimalRestaurant} />);
		expect(screen.getByText('Minimal Restaurant')).toBeInTheDocument();
	});

	it('handles empty photos array', () => {
		const restaurantWithNoPhotos: RestaurantType = {
			...mockRestaurant,
			photos: [],
		};

		render(<RestaurantItem restaurant={restaurantWithNoPhotos} />);
		expect(screen.getByText('ONIBUS COFFEE')).toBeInTheDocument();
	});

	it('handles null values gracefully', () => {
		const restaurantWithNulls: RestaurantType = {
			...mockRestaurant,
			description: null,
			rating: null,
			numberOfReviews: null,
		};

		render(<RestaurantItem restaurant={restaurantWithNulls} />);
		expect(screen.getByText('ONIBUS COFFEE')).toBeInTheDocument();
	});

	it('handles false official status', () => {
		const unofficialRestaurant: RestaurantType = {
			...mockRestaurant,
			official: false,
		};

		render(<RestaurantItem restaurant={unofficialRestaurant} />);
		expect(screen.getByText('ONIBUS COFFEE')).toBeInTheDocument();
	});
});
