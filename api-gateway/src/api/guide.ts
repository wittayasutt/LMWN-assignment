import { guideApi, AxiosResponse } from '../utils';

export const fetchGuideList = async (): Promise<AxiosResponse> => {
	try {
		return await guideApi.get(`/guides`);
	} catch (error) {
		console.error('Error fetching guide list', error);
		throw error;
	}
};

export const fetchGuideItem = async (id: string): Promise<AxiosResponse> => {
	try {
		return await guideApi.get(`/guides/${id}`);
	} catch (error) {
		console.error('Error fetching guide item', error);
		throw error;
	}
};

export const fetchGuideItemDetail = async (
	id: string,
): Promise<AxiosResponse> => {
	try {
		return await guideApi.get(`/guide-items/${id}`);
	} catch (error) {
		console.error('Error fetching guide item detail', error);
		throw error;
	}
};
