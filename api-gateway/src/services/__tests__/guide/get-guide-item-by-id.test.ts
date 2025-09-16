import { AxiosResponse } from 'axios';
import { omit } from 'lodash';
import { jest, describe, it, expect, beforeEach } from '@jest/globals';

import { getGuideItemById } from '../../guide';
import * as api from '../../../api';
import { mockGuideItem } from '../../../__mocks__';

jest.mock('../../../api');

const mockedApi = api as jest.Mocked<typeof api>;

describe('getGuideItemById', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should return parsed guide data when API call succeeds', async () => {
		const mockApiResponse = {
			data: mockGuideItem,
			status: 200,
			statusText: 'OK',
		};

		const expectedResult = omit(mockGuideItem, ['items']);

		mockedApi.fetchGuideItem.mockResolvedValue(
			mockApiResponse as AxiosResponse,
		);

		const result = await getGuideItemById(mockGuideItem.id);

		expect(mockedApi.fetchGuideItem).toHaveBeenCalledWith(mockGuideItem.id);
		expect(result).toEqual(expectedResult);
	});

	it('should handle guide data with missing optional fields', async () => {
		const mockApiResponse = {
			data: {
				id: mockGuideItem.id,
				title: mockGuideItem.title,
			},
			status: 200,
			statusText: 'OK',
		};

		mockedApi.fetchGuideItem.mockResolvedValue(
			mockApiResponse as AxiosResponse,
		);

		const result = await getGuideItemById(mockGuideItem.id);

		expect(mockedApi.fetchGuideItem).toHaveBeenCalledWith(mockGuideItem.id);
		expect(result).toEqual({
			id: mockGuideItem.id,
			title: mockGuideItem.title,
		});
		expect(result.socialTitle).toBeUndefined();
		expect(result.shortDescription).toBeUndefined();
	});

	it('should strip extra fields not in schema', async () => {
		const dataWithExtraFields = {
			...mockGuideItem,
			extraField: 'should be removed',
			anotherExtra: 123,
			nestedExtra: { foo: 'bar' },
		};
		const mockApiResponse = {
			data: dataWithExtraFields,
			status: 200,
			statusText: 'OK',
		};

		mockedApi.fetchGuideItem.mockResolvedValue(
			mockApiResponse as AxiosResponse,
		);

		const result = await getGuideItemById(mockGuideItem.id);
		const expectedResult = omit(mockGuideItem, ['items']);

		expect(mockedApi.fetchGuideItem).toHaveBeenCalledWith(mockGuideItem.id);
		expect(result).toEqual(expectedResult);
		expect(result).not.toHaveProperty('extraField');
		expect(result).not.toHaveProperty('anotherExtra');
		expect(result).not.toHaveProperty('nestedExtra');
		expect(result).not.toHaveProperty('items');
	});

	it('should throw error when data validation fails', async () => {
		const mockGuideId = mockGuideItem.id;
		const mockApiResponse = {
			data: {
				invalidField: 'invalid',
			},
			status: 200,
			statusText: 'OK',
		};

		mockedApi.fetchGuideItem.mockResolvedValue(
			mockApiResponse as AxiosResponse,
		);

		await expect(getGuideItemById(mockGuideId)).rejects.toThrow();
		expect(mockedApi.fetchGuideItem).toHaveBeenCalledWith(mockGuideId);
	});

	it('should handle empty response data', async () => {
		const mockApiResponse = {
			data: {},
			status: 200,
			statusText: 'OK',
		};

		mockedApi.fetchGuideItem.mockResolvedValue(
			mockApiResponse as AxiosResponse,
		);

		await expect(getGuideItemById(mockGuideItem.id)).rejects.toThrow();
		expect(mockedApi.fetchGuideItem).toHaveBeenCalledWith(mockGuideItem.id);
	});

	it('should throw error when API call fails', async () => {
		const mockError = new Error('API Error');

		mockedApi.fetchGuideItem.mockRejectedValue(mockError);

		await expect(getGuideItemById(mockGuideItem.id)).rejects.toThrow(
			'API Error',
		);
		expect(mockedApi.fetchGuideItem).toHaveBeenCalledWith(mockGuideItem.id);
	});
});
