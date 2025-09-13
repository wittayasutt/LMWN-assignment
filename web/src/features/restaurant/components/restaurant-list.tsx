import RestaurantItem from './restaurant-item';

import type { RestaurantType } from '../types';

// TODO: remove mock data
const mockData: RestaurantType[] = [
	{
		id: 'cea893e7-1893-43ed-8890-f404395572d0',
		name: 'ONIBUS COFFEE',
		description: 'ONI BUS ร้านสุดลับซ่อนตัวอยู่ที่ไหนก็ไม่รู้',
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
		rating: 4.29,
		numberOfReviews: 6,
		url: 'https://www.wongnai.com/restaurants/2179285Ss-onibus-coffee-bangkok',
		address: '22, สำราญราษฎร์ สำราญราษฎร์ พระนคร กรุงเทพมหานคร',
		lat: 13.752888635769,
		lng: 100.5034106411,
		phoneNo: '0939164541',
		categories: ['ร้านกาแฟ/ชา'],
		instagram: 'onibuscoffee_bkk',
		workingHours: [
			{
				day: 1,
				open: '08:00',
				close: '17:00',
			},
			{
				day: 2,
				open: '08:00',
				close: '17:00',
			},
			{
				day: 3,
				open: '08:00',
				close: '17:00',
			},
			{
				day: 4,
				open: '08:00',
				close: '17:00',
			},
			{
				day: 5,
				open: '08:00',
				close: '17:00',
			},
			{
				day: 6,
				open: '08:00',
				close: '17:00',
			},
			{
				day: 7,
				open: '08:00',
				close: '17:00',
			},
		],
		official: true,
		delivery: true,
		pickup: true,
	},
];

function RestaurantList() {
	// TODO: fetch restaurants from API
	const restaurants: RestaurantType[] = mockData;

	return restaurants.map((restaurant) => (
		<RestaurantItem key={restaurant.id} restaurant={restaurant} />
	));
}

export default RestaurantList;
