import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { mockRestaurant } from '@/mock';
import type { RestaurantType } from '@/types';

import RestaurantList from './restaurant-list';
import * as restaurantApi from '../api';

vi.mock('../api', () => ({
	useQueryRestaurants: vi.fn(),
}));

vi.mock('./', () => ({
	RestaurantItem: ({ restaurant }: { restaurant: RestaurantType }) => (
		<div data-testid="restaurant-item">{restaurant.name}</div>
	),
	RestaurantItemSkeleton: () => <div data-testid="restaurant-skeleton" />,
}));

const mockUseQueryRestaurants = vi.mocked(restaurantApi.useQueryRestaurants);

describe('RestaurantList', () => {
	const testId = 'test-guide-id';

	afterEach(() => {
		vi.clearAllMocks();
	});

	it('renders skeleton components when loading', () => {
		mockUseQueryRestaurants.mockReturnValue({
			data: undefined,
			isLoading: true,
			isError: false,
		} as ReturnType<typeof restaurantApi.useQueryRestaurants>);

		render(<RestaurantList id={testId} />);

		const skeletons = screen.getAllByTestId('restaurant-skeleton');
		expect(skeletons).toHaveLength(5);
	});

	it('renders null when there is an error', () => {
		mockUseQueryRestaurants.mockReturnValue({
			data: undefined,
			isLoading: false,
			isError: true,
		} as ReturnType<typeof restaurantApi.useQueryRestaurants>);

		const { container } = render(<RestaurantList id={testId} />);
		expect(container.firstChild).toBeNull();
	});

	it('renders null when data is empty array', () => {
		mockUseQueryRestaurants.mockReturnValue({
			data: [] as RestaurantType[],
			isLoading: false,
			isError: false,
		} as ReturnType<typeof restaurantApi.useQueryRestaurants>);

		const { container } = render(<RestaurantList id={testId} />);
		expect(container.firstChild).toBeNull();
	});

	it('renders null when data is undefined', () => {
		mockUseQueryRestaurants.mockReturnValue({
			data: undefined,
			isLoading: false,
			isError: false,
		} as ReturnType<typeof restaurantApi.useQueryRestaurants>);

		const { container } = render(<RestaurantList id={testId} />);
		expect(container.firstChild).toBeNull();
	});

	it('renders RestaurantItem components for each restaurant', () => {
		const mockRestaurants = [
			mockRestaurant,
			{ ...mockRestaurant, id: 'test-id-2', name: 'Second Restaurant' },
			{ ...mockRestaurant, id: 'test-id-3', name: 'Third Restaurant' },
		];

		mockUseQueryRestaurants.mockReturnValue({
			data: mockRestaurants,
			isLoading: false,
			isError: false,
		} as ReturnType<typeof restaurantApi.useQueryRestaurants>);

		render(<RestaurantList id={testId} />);

		expect(screen.getByText('ONIBUS COFFEE')).toBeInTheDocument();
		expect(screen.getByText('Second Restaurant')).toBeInTheDocument();
		expect(screen.getByText('Third Restaurant')).toBeInTheDocument();

		const restaurantItems = screen.getAllByTestId('restaurant-item');
		expect(restaurantItems).toHaveLength(3);
	});

	it('handles single restaurant data correctly', () => {
		mockUseQueryRestaurants.mockReturnValue({
			data: [mockRestaurant],
			isLoading: false,
			isError: false,
		} as ReturnType<typeof restaurantApi.useQueryRestaurants>);

		render(<RestaurantList id={testId} />);

		expect(screen.getByText('ONIBUS COFFEE')).toBeInTheDocument();
		const restaurantItems = screen.getAllByTestId('restaurant-item');
		expect(restaurantItems).toHaveLength(1);
	});

	it('calls useQueryRestaurants with correct id', () => {
		mockUseQueryRestaurants.mockReturnValue({
			data: [] as RestaurantType[],
			isLoading: false,
			isError: false,
		} as ReturnType<typeof restaurantApi.useQueryRestaurants>);

		render(<RestaurantList id={testId} />);

		expect(mockUseQueryRestaurants).toHaveBeenCalledWith(testId);
	});
});
