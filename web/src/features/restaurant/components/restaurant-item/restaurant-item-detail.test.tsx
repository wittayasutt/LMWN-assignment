import { describe, it, expect } from 'vitest';
import { mockRestaurant } from '@/mock';
import { render, screen } from '@testing-library/react';
import type { RestaurantType } from '@/types';

import RestaurantItemDetail from './restaurant-item-detail';

describe('RestaurantItemDetail', () => {
	it('renders null when restaurant has no relevant data', () => {
		const emptyRestaurant: RestaurantType = {
			...mockRestaurant,
			phoneNo: null,
			address: null,
			categories: undefined,
			delivery: false,
			pickup: false,
		};

		const { container } = render(
			<RestaurantItemDetail restaurant={emptyRestaurant} />,
		);

		expect(container.firstChild).toBeNull();
	});

	it('renders phone number with tel link when phoneNo is provided', () => {
		render(<RestaurantItemDetail restaurant={mockRestaurant} />);

		const phoneLink = screen.getByRole('link', { name: '0939164541' });
		expect(phoneLink).toBeInTheDocument();
		expect(phoneLink).toHaveAttribute('href', 'tel:0939164541');
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
			name: '22, สำราญราษฎร์ สำราญราษฎร์ พระนคร กรุงเทพมหานคร',
		});
		expect(addressLink).toBeInTheDocument();
		expect(addressLink).toHaveAttribute(
			'href',
			'https://www.google.com/maps/search/?api=1&query=13.752888635769,100.5034106411',
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

		expect(
			screen.getByText('22, สำราญราษฎร์ สำราญราษฎร์ พระนคร กรุงเทพมหานคร'),
		).toBeInTheDocument();
		expect(
			screen.queryByRole('link', {
				name: '22, สำราญราษฎร์ สำราญราษฎร์ พระนคร กรุงเทพมหานคร',
			}),
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

		expect(screen.getByText('ร้านกาแฟ/ชา')).toBeInTheDocument();
		expect(screen.getByText('เดลิเวอรี่')).toBeInTheDocument();
		expect(screen.getByText('รับที่ร้าน')).toBeInTheDocument();
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
		expect(screen.getByText('รับที่ร้าน')).toBeInTheDocument();
		expect(screen.queryByText('ร้านกาแฟ/ชา')).not.toBeInTheDocument();
	});

	it('renders only categories when delivery and pickup are both false', () => {
		const restaurantWithoutDeliveryPickup = {
			...mockRestaurant,
			delivery: false,
			pickup: false,
		};

		render(
			<RestaurantItemDetail restaurant={restaurantWithoutDeliveryPickup} />,
		);

		expect(screen.getByText('ร้านกาแฟ/ชา')).toBeInTheDocument();
		expect(screen.queryByText('เดลิเวอรี่')).not.toBeInTheDocument();
		expect(screen.queryByText('รับที่ร้าน')).not.toBeInTheDocument();
	});

	it('renders complete component with all sections when all data is provided', () => {
		render(<RestaurantItemDetail restaurant={mockRestaurant} />);

		expect(screen.getByText('ติดต่อ:')).toBeInTheDocument();
		expect(screen.getByText('ที่อยู่:')).toBeInTheDocument();
		expect(
			screen.getByRole('link', { name: '0939164541' }),
		).toBeInTheDocument();
		expect(
			screen.getByRole('link', {
				name: '22, สำราญราษฎร์ สำราญราษฎร์ พระนคร กรุงเทพมหานคร',
			}),
		).toBeInTheDocument();
		expect(screen.getByText('ร้านกาแฟ/ชา')).toBeInTheDocument();
		expect(screen.getByText('เดลิเวอรี่')).toBeInTheDocument();
		expect(screen.getByText('รับที่ร้าน')).toBeInTheDocument();
	});
});
