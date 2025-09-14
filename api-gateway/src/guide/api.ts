import { AxiosResponse } from 'axios';

import { axios } from '../utils';

export const fetchGuideList = async (): Promise<AxiosResponse> => {
	return await axios.get(`/guides`);
};

export const fetchGuideItem = async (id: string): Promise<AxiosResponse> => {
	return await axios.get(`/guides/${id}`);
};

export const fetchGuideItemDetail = async (
	id: string,
): Promise<AxiosResponse> => {
	return await axios.get(`/guide-items/${id}`);
};
