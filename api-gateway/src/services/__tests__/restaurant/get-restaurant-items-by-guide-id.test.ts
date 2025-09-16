import { AxiosResponse } from 'axios';
import { jest, describe, it, expect, beforeEach } from '@jest/globals';

import { getRestaurantItemsByGuideId } from '../../restaurant';
import * as api from '../../../api';
import {
	mockGuideItem,
	mockGuideDetail,
	mockGuideDetail2,
	mockRestaurantItem,
} from '../../../__mocks__';

jest.mock('../../../api');

const mockedApi = api as jest.Mocked<typeof api>;

describe('getRestaurantItemsByGuideId', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should successfully return restaurant items for a valid guide ID', async () => {
		mockedApi.fetchGuideItem.mockResolvedValue({
			data: mockGuideItem,
		} as AxiosResponse);

		mockedApi.fetchGuideItemDetail.mockResolvedValue({
			data: mockGuideDetail,
		} as AxiosResponse);

		mockedApi.fetchRestaurant.mockResolvedValue({
			data: mockRestaurantItem,
		} as AxiosResponse);

		const result = await getRestaurantItemsByGuideId(mockGuideItem.id);

		expect(mockedApi.fetchGuideItem).toHaveBeenCalledWith(mockGuideItem.id);
		expect(mockedApi.fetchGuideItemDetail).toHaveBeenCalledTimes(10);
		expect(mockedApi.fetchRestaurant).toHaveBeenCalledTimes(10);
		expect(result).toHaveLength(10);
		expect(result[0]).toMatchObject({
			id: mockRestaurantItem.id,
			name: mockRestaurantItem.name,
			description: mockGuideDetail.description,
			rating: mockRestaurantItem.rating,
		});
	});

	it('should throw error when fetchGuideItem fails', async () => {
		const error = new Error('Failed to fetch guide item');
		mockedApi.fetchGuideItem.mockRejectedValue(error);

		await expect(getRestaurantItemsByGuideId('invalid-id')).rejects.toThrow(
			'Failed to fetch guide item',
		);

		expect(mockedApi.fetchGuideItem).toHaveBeenCalledWith('invalid-id');
		expect(mockedApi.fetchGuideItemDetail).not.toHaveBeenCalled();
		expect(mockedApi.fetchRestaurant).not.toHaveBeenCalled();
	});

	it('should handle mixed success/failure in Promise.allSettled and return only successful results', async () => {
		mockedApi.fetchGuideItem.mockResolvedValue({
			data: {
				...mockGuideItem,
				items: [mockGuideItem.items?.[0], 'invalid-id'],
			},
		} as AxiosResponse);

		mockedApi.fetchGuideItemDetail
			.mockResolvedValueOnce({
				data: mockGuideDetail,
			} as AxiosResponse)
			.mockRejectedValueOnce(new Error('Failed to fetch detail'));

		mockedApi.fetchRestaurant.mockResolvedValue({
			data: mockRestaurantItem,
		} as AxiosResponse);

		const result = await getRestaurantItemsByGuideId(mockGuideItem.id);

		expect(result).toHaveLength(1);
		expect(result[0]).toMatchObject({
			id: mockRestaurantItem.id,
			name: mockRestaurantItem.name,
			description: mockGuideDetail.description,
			rating: mockRestaurantItem.rating,
		});
	});

	it('should return empty array when guide has no items', async () => {
		mockedApi.fetchGuideItem.mockResolvedValue({
			data: {
				...mockGuideItem,
				items: [],
			},
		} as AxiosResponse);

		const result = await getRestaurantItemsByGuideId(mockGuideItem.id);

		expect(result).toEqual([]);
		expect(mockedApi.fetchGuideItemDetail).not.toHaveBeenCalled();
		expect(mockedApi.fetchRestaurant).not.toHaveBeenCalled();
	});

	it('should filter out null/undefined items from guide', async () => {
		mockedApi.fetchGuideItem.mockResolvedValue({
			data: {
				...mockGuideItem,
				items: ['valid-id', null, undefined, '', 'another-valid-id'],
			},
		} as AxiosResponse);

		mockedApi.fetchGuideItemDetail.mockResolvedValue({
			data: mockGuideDetail,
		} as AxiosResponse);

		mockedApi.fetchRestaurant.mockResolvedValue({
			data: mockRestaurantItem,
		} as AxiosResponse);

		await getRestaurantItemsByGuideId(mockGuideItem.id);

		expect(mockedApi.fetchGuideItemDetail).toHaveBeenCalledTimes(2);
		expect(mockedApi.fetchGuideItemDetail).toHaveBeenCalledWith('valid-id');
		expect(mockedApi.fetchGuideItemDetail).toHaveBeenCalledWith(
			'another-valid-id',
		);
	});

	it('should handle restaurant fetch failure gracefully', async () => {
		mockedApi.fetchGuideItem.mockResolvedValue({
			data: {
				...mockGuideItem,
				items: [mockGuideItem.items?.[0], mockGuideItem.items?.[1]],
			},
		} as AxiosResponse);

		mockedApi.fetchGuideItemDetail
			.mockResolvedValueOnce({
				data: mockGuideDetail,
			} as AxiosResponse)
			.mockResolvedValueOnce({
				data: mockGuideDetail2,
			} as AxiosResponse);

		mockedApi.fetchRestaurant
			.mockResolvedValueOnce({
				data: mockRestaurantItem,
			} as AxiosResponse)
			.mockRejectedValueOnce(new Error('Restaurant not found'));

		const result = await getRestaurantItemsByGuideId(mockGuideItem.id);

		expect(result).toHaveLength(1);
		expect(result[0]).toMatchObject({
			id: mockRestaurantItem.id,
			name: mockRestaurantItem.name,
			description: mockGuideDetail.description,
			rating: mockRestaurantItem.rating,
		});
	});
});
