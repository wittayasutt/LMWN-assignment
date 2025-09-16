import { AxiosResponse } from 'axios';
import { omit } from 'lodash';
import { jest, describe, it, expect, beforeEach } from '@jest/globals';

import { getGuideItemById } from '../../guide';
import * as api from '../../../api';
import { mockGuideDetail } from '../../../__mocks__';

jest.mock('../../../api');

const mockedApi = api as jest.Mocked<typeof api>;

describe('getGuideItemById', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should return parsed guide data when API call succeeds', async () => {
		const mockGuideId = mockGuideDetail.id;
		const mockApiResponse = {
			data: mockGuideDetail,
			status: 200,
			statusText: 'OK',
		};

		const expectedResult = omit(mockGuideDetail, ['items']);

		mockedApi.fetchGuideItem.mockResolvedValue(
			mockApiResponse as AxiosResponse,
		);

		const result = await getGuideItemById(mockGuideId);

		expect(mockedApi.fetchGuideItem).toHaveBeenCalledWith(mockGuideId);
		expect(result).toEqual(expectedResult);
	});

	it('should throw error when data validation fails', async () => {
		const mockGuideId = mockGuideDetail.id;
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

	it('should throw error when API call fails', async () => {
		const mockGuideId = mockGuideDetail.id;
		const mockError = new Error('API Error');

		mockedApi.fetchGuideItem.mockRejectedValue(mockError);

		await expect(getGuideItemById(mockGuideId)).rejects.toThrow('API Error');
		expect(mockedApi.fetchGuideItem).toHaveBeenCalledWith(mockGuideId);
	});
});
