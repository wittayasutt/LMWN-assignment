import { GuideItemDetailResponseType } from '../../types';

export const mockGuideDetail: GuideItemDetailResponseType = {
	id: 'c77c4d6c-01fa-4e62-8870-563de216a976',
	description: 'ONI BUS ร้านสุดลับซ่อนตัวอยู่ที่ไหนก็ไม่รู้',
	restaurantId: 'cea893e7-1893-43ed-8890-f404395572d0',
	photos: [
		{
			id: '07595a7a-c2cf-4051-8d11-5c558c8e35fa',
			smallUrl: 'http://localhost:7777/r/480/854/20250205_121426.jpg',
			largeUrl: 'http://localhost:7777/r/1080/1920/20250205_121426.jpg',
		},
		{
			id: '6fef0249-7ce1-4fc9-aa33-d5bb974d7ce7',
			smallUrl: 'http://localhost:7777/r/480/854/20250205_121840.jpg',
			largeUrl: 'http://localhost:7777/r/1080/1920/20250205_121840.jpg',
		},
		{
			id: 'e11c64cf-d81b-41c1-93d8-de542bb08c44',
			smallUrl: 'http://localhost:7777/r/480/854/20250205_121417.jpg',
			largeUrl: 'http://localhost:7777/r/1080/1920/20250205_121417.jpg',
		},
		{
			id: '9f01ee78-7589-4290-9ca8-27ede16b4776',
			smallUrl: 'http://localhost:7777/r/480/854/20250205_121414.jpg',
			largeUrl: 'http://localhost:7777/r/1080/1920/20250205_121414.jpg',
		},
	],
};

export const mockGuideDetail2: GuideItemDetailResponseType = {
	id: '0f98215a-848a-40b6-aa29-89b7ecb56c7f',
	description: 'ไม่อยากจะเชื่อ KFC ขายกาแฟซะด้วย !',
	restaurantId: '0f98215a-848a-40b6-aa29-89b7ecb56c7f',
	photos: [
		{
			id: 'e9230ce7-ef5e-4c89-96da-46ec98461ef8',
			smallUrl: 'http://localhost:7777/r/480/854/20250131_125859.jpg',
			largeUrl: 'http://localhost:7777/r/1080/1920/20250131_125859.jpg',
		},
	],
};
