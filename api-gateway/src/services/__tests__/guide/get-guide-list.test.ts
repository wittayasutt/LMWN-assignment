import { AxiosResponse } from 'axios';
import { omit } from 'lodash';
import { jest, describe, it, expect, beforeEach } from '@jest/globals';

import { getGuideList } from '../../guide';
import * as api from '../../../api';
import {
	mockGuideList,
	mockGuideItem,
	mockGuideItem2,
} from '../../../__mocks__';

jest.mock('../../../api');

const mockedApi = api as jest.Mocked<typeof api>;

describe('getGuideList', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should return parsed guide list when API calls succeed', async () => {
		const mockGuideListResponse = {
			data: mockGuideList,
			status: 200,
			statusText: 'OK',
		};

		const mockGuideItemResponse1 = {
			data: mockGuideItem,
			status: 200,
			statusText: 'OK',
		};

		const mockGuideItemResponse2 = {
			data: mockGuideItem2,
			status: 200,
			statusText: 'OK',
		};

		mockedApi.fetchGuideList.mockResolvedValue(
			mockGuideListResponse as AxiosResponse,
		);
		mockedApi.fetchGuideItem
			.mockResolvedValueOnce(mockGuideItemResponse1 as AxiosResponse)
			.mockResolvedValueOnce(mockGuideItemResponse2 as AxiosResponse);

		const result = await getGuideList();

		expect(mockedApi.fetchGuideList).toHaveBeenCalledTimes(1);
		expect(mockedApi.fetchGuideItem).toHaveBeenCalledTimes(2);
		expect(mockedApi.fetchGuideItem).toHaveBeenNthCalledWith(
			1,
			mockGuideList[0],
		);
		expect(mockedApi.fetchGuideItem).toHaveBeenNthCalledWith(
			2,
			mockGuideList[1],
		);

		expect(result).toHaveLength(2);
		expect(result[0]).toEqual(omit(mockGuideItem, ['items']));
		expect(result[1]).toEqual(omit(mockGuideItem2, ['items']));
		expect(result[0]).not.toHaveProperty('items');
		expect(result[1]).not.toHaveProperty('items');
	});

	it('should return empty array when guide list is empty', async () => {
		const mockGuideListResponse = {
			data: [],
			status: 200,
			statusText: 'OK',
		};

		mockedApi.fetchGuideList.mockResolvedValue(
			mockGuideListResponse as AxiosResponse,
		);

		const result = await getGuideList();

		expect(mockedApi.fetchGuideList).toHaveBeenCalledTimes(1);
		expect(mockedApi.fetchGuideItem).not.toHaveBeenCalled();
		expect(result).toEqual([]);
		expect(result).toHaveLength(0);
	});

	it('should filter out empty and null guide IDs', async () => {
		const mockGuideListWithEmpties = [
			'',
			null,
			mockGuideList[0],
			'',
			undefined,
			mockGuideList[1],
		];
		const mockGuideListResponse = {
			data: mockGuideListWithEmpties,
			status: 200,
			statusText: 'OK',
		};

		const mockGuideItemResponse1 = {
			data: mockGuideItem,
			status: 200,
			statusText: 'OK',
		};

		const mockGuideItemResponse2 = {
			data: mockGuideItem2,
			status: 200,
			statusText: 'OK',
		};

		mockedApi.fetchGuideList.mockResolvedValue(
			mockGuideListResponse as AxiosResponse,
		);
		mockedApi.fetchGuideItem
			.mockResolvedValueOnce(mockGuideItemResponse1 as AxiosResponse)
			.mockResolvedValueOnce(mockGuideItemResponse2 as AxiosResponse);

		const result = await getGuideList();

		expect(mockedApi.fetchGuideList).toHaveBeenCalledTimes(1);
		expect(mockedApi.fetchGuideItem).toHaveBeenCalledTimes(2);
		expect(mockedApi.fetchGuideItem).toHaveBeenNthCalledWith(
			1,
			mockGuideList[0],
		);
		expect(mockedApi.fetchGuideItem).toHaveBeenNthCalledWith(
			2,
			mockGuideList[1],
		);
		expect(result).toHaveLength(2);
	});

	it('should throw error when fetchGuideList fails', async () => {
		const mockError = new Error('Failed to fetch guide list');
		mockedApi.fetchGuideList.mockRejectedValue(mockError);

		await expect(getGuideList()).rejects.toThrow('Failed to fetch guide list');
		expect(mockedApi.fetchGuideList).toHaveBeenCalledTimes(1);
		expect(mockedApi.fetchGuideItem).not.toHaveBeenCalled();
	});

	it('should return successful guides when some fetchGuideItem calls fail', async () => {
		const mockGuideListResponse = {
			data: mockGuideList,
			status: 200,
			statusText: 'OK',
		};

		const mockGuideItemResponse1 = {
			data: mockGuideItem,
			status: 200,
			statusText: 'OK',
		};

		const mockError = new Error('Failed to fetch guide item');

		mockedApi.fetchGuideList.mockResolvedValue(
			mockGuideListResponse as AxiosResponse,
		);
		mockedApi.fetchGuideItem
			.mockResolvedValueOnce(mockGuideItemResponse1 as AxiosResponse)
			.mockRejectedValueOnce(mockError);

		const result = await getGuideList();

		expect(mockedApi.fetchGuideList).toHaveBeenCalledTimes(1);
		expect(mockedApi.fetchGuideItem).toHaveBeenCalledTimes(2);
		expect(result).toHaveLength(1);
		expect(result[0]).toEqual(omit(mockGuideItem, ['items']));
	});

	it('should filter out guides that fail schema validation', async () => {
		const mockGuideListResponse = {
			data: mockGuideList,
			status: 200,
			statusText: 'OK',
		};

		const mockGuideItemResponse1 = {
			data: mockGuideItem,
			status: 200,
			statusText: 'OK',
		};

		const invalidGuideItemResponse = {
			data: {
				invalidField: 'invalid',
				missingRequiredFields: true,
			},
			status: 200,
			statusText: 'OK',
		};

		mockedApi.fetchGuideList.mockResolvedValue(
			mockGuideListResponse as AxiosResponse,
		);
		mockedApi.fetchGuideItem
			.mockResolvedValueOnce(mockGuideItemResponse1 as AxiosResponse)
			.mockResolvedValueOnce(invalidGuideItemResponse as AxiosResponse);

		const result = await getGuideList();

		expect(mockedApi.fetchGuideList).toHaveBeenCalledTimes(1);
		expect(mockedApi.fetchGuideItem).toHaveBeenCalledTimes(2);
		expect(result).toHaveLength(1);
		expect(result[0]).toEqual(omit(mockGuideItem, ['items']));
	});

	it('should return empty array when all guide item fetches fail', async () => {
		const mockGuideListResponse = {
			data: mockGuideList,
			status: 200,
			statusText: 'OK',
		};

		const mockError = new Error('All guide items failed');

		mockedApi.fetchGuideList.mockResolvedValue(
			mockGuideListResponse as AxiosResponse,
		);
		mockedApi.fetchGuideItem.mockRejectedValue(mockError);

		const result = await getGuideList();

		expect(mockedApi.fetchGuideList).toHaveBeenCalledTimes(1);
		expect(mockedApi.fetchGuideItem).toHaveBeenCalledTimes(2);
		expect(result).toEqual([]);
		expect(result).toHaveLength(0);
	});
});
