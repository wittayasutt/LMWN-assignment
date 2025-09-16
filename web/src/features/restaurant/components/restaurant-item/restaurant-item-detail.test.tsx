import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { RestaurantType } from '@/types';

import RestaurantItemDetail from './restaurant-item-detail';

const mockRestaurant: RestaurantType = {
	id: '1',
	name: 'Test Restaurant',
	phoneNo: '02-123-4567',
	address: '123 Test Street, Bangkok',
	lat: 13.7563,
	lng: 100.5018,
	categories: ['Thai', 'Seafood'],
	delivery: true,
	pickup: false,
	description: 'Test description',
	rating: 4.5,
	numberOfReviews: 100,
	official: true,
	workingHours: [],
	facebook: null,
	instagram: null,
	url: null,
};

describe('RestaurantItemDetail', () => {
	it('renders null when restaurant has no relevant data', () => {
		const emptyRestaurant: RestaurantType = {
			id: '1',
			name: 'Test Restaurant',
			phoneNo: null,
			address: null,
			categories: undefined,
			delivery: false,
			pickup: false,
			description: 'Test description',
			rating: 4.5,
			numberOfReviews: 100,
			official: true,
			workingHours: [],
			facebook: null,
			instagram: null,
			url: null,
		};

		const { container } = render(
			<RestaurantItemDetail restaurant={emptyRestaurant} />,
		);

		expect(container.firstChild).toBeNull();
	});

	it('renders phone number with tel link when phoneNo is provided', () => {
		render(<RestaurantItemDetail restaurant={mockRestaurant} />);

		const phoneLink = screen.getByRole('link', { name: '02-123-4567' });
		expect(phoneLink).toBeInTheDocument();
		expect(phoneLink).toHaveAttribute('href', 'tel:02-123-4567');
		expect(screen.getByText('ติดต่อ:')).toBeInTheDocument();
	});

	it('does not render phone section when phoneNo is null', () => {
		const restaurantWithoutPhone = {
			...mockRestaurant,
			phoneNo: null,
		};

		render(<RestaurantItemDetail restaurant={restaurantWithoutPhone} />);

		expect(screen.queryByText('ติดต่อ:')).not.toBeInTheDocument();
	});

	it('renders address with Google Maps link when coordinates are provided', () => {
		render(<RestaurantItemDetail restaurant={mockRestaurant} />);

		const addressLink = screen.getByRole('link', {
			name: '123 Test Street, Bangkok',
		});
		expect(addressLink).toBeInTheDocument();
		expect(addressLink).toHaveAttribute(
			'href',
			'https://www.google.com/maps/search/?api=1&query=13.7563,100.5018',
		);
		expect(addressLink).toHaveAttribute('target', '_blank');
		expect(addressLink).toHaveAttribute('rel', 'noopener noreferrer');
		expect(screen.getByText('ที่อยู่:')).toBeInTheDocument();
	});

	it('renders address as plain text when coordinates are not provided', () => {
		const restaurantWithoutCoords = {
			...mockRestaurant,
			lat: null,
			lng: null,
		};

		render(<RestaurantItemDetail restaurant={restaurantWithoutCoords} />);

		expect(screen.getByText('123 Test Street, Bangkok')).toBeInTheDocument();
		expect(
			screen.queryByRole('link', { name: '123 Test Street, Bangkok' }),
		).not.toBeInTheDocument();
		expect(screen.getByText('ที่อยู่:')).toBeInTheDocument();
	});

	it('does not render address section when address is null', () => {
		const restaurantWithoutAddress = {
			...mockRestaurant,
			address: null,
		};

		render(<RestaurantItemDetail restaurant={restaurantWithoutAddress} />);

		expect(screen.queryByText('ที่อยู่:')).not.toBeInTheDocument();
	});

	it('renders tags with categories and delivery/pickup options', () => {
		render(<RestaurantItemDetail restaurant={mockRestaurant} />);

		expect(screen.getByText('Thai')).toBeInTheDocument();
		expect(screen.getByText('Seafood')).toBeInTheDocument();
		expect(screen.getByText('เดลิเวอรี่')).toBeInTheDocument();
		expect(screen.queryByText('รับที่ร้าน')).not.toBeInTheDocument();
	});

	it('renders pickup tag when pickup is true', () => {
		const restaurantWithPickup = {
			...mockRestaurant,
			pickup: true,
		};

		render(<RestaurantItemDetail restaurant={restaurantWithPickup} />);

		expect(screen.getByText('รับที่ร้าน')).toBeInTheDocument();
	});

	it('renders only delivery/pickup tags when no categories are provided', () => {
		const restaurantWithoutCategories = {
			...mockRestaurant,
			categories: undefined,
		};

		render(<RestaurantItemDetail restaurant={restaurantWithoutCategories} />);

		expect(screen.getByText('เดลิเวอรี่')).toBeInTheDocument();
		expect(screen.queryByText('Thai')).not.toBeInTheDocument();
		expect(screen.queryByText('Seafood')).not.toBeInTheDocument();
	});

	it('renders only categories when delivery and pickup are both false', () => {
		const restaurantWithoutDeliveryPickup = {
			...mockRestaurant,
			delivery: false,
		};

		render(
			<RestaurantItemDetail restaurant={restaurantWithoutDeliveryPickup} />,
		);

		expect(screen.getByText('Thai')).toBeInTheDocument();
		expect(screen.getByText('Seafood')).toBeInTheDocument();
		expect(screen.queryByText('เดลิเวอรี่')).not.toBeInTheDocument();
		expect(screen.queryByText('รับที่ร้าน')).not.toBeInTheDocument();
	});

	it('renders complete component with all sections when all data is provided', () => {
		const completeRestaurant = {
			...mockRestaurant,
			pickup: true,
		};

		render(<RestaurantItemDetail restaurant={completeRestaurant} />);

		expect(screen.getByText('ติดต่อ:')).toBeInTheDocument();
		expect(screen.getByText('ที่อยู่:')).toBeInTheDocument();
		expect(
			screen.getByRole('link', { name: '02-123-4567' }),
		).toBeInTheDocument();
		expect(
			screen.getByRole('link', { name: '123 Test Street, Bangkok' }),
		).toBeInTheDocument();
		expect(screen.getByText('Thai')).toBeInTheDocument();
		expect(screen.getByText('Seafood')).toBeInTheDocument();
		expect(screen.getByText('เดลิเวอรี่')).toBeInTheDocument();
		expect(screen.getByText('รับที่ร้าน')).toBeInTheDocument();
	});
});
