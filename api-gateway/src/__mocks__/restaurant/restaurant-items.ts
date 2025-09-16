import { RestaurantItemResponseType } from '../../types';

export const mockRestaurantItem: RestaurantItemResponseType = {
	id: 'cea893e7-1893-43ed-8890-f404395572d0',
	name: 'ONIBUS COFFEE',
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
};

export const mockRestaurantItem2: RestaurantItemResponseType = {
	id: '0f98215a-848a-40b6-aa29-89b7ecb56c7f',
	name: 'KFC',
	rating: 4,
	numberOfReviews: 2,
	url: 'https://www.wongnai.com/restaurants/2906627Ep-kfc-one-bangkok',
	address: 'One Bangkok , Zone Parade Floor B1',
	lat: 13.7272219816833,
	lng: 100.547280516475,
	phoneNo: '0655053058',
	categories: ['ฟาสต์ฟู้ด/จานด่วน'],
	workingHours: [
		{
			day: 1,
			open: '10:00',
			close: '22:00',
		},
		{
			day: 2,
			open: '10:00',
			close: '22:00',
		},
		{
			day: 3,
			open: '10:00',
			close: '22:00',
		},
		{
			day: 4,
			open: '10:00',
			close: '22:00',
		},
		{
			day: 5,
			open: '10:00',
			close: '22:00',
		},
		{
			day: 6,
			open: '10:00',
			close: '22:00',
		},
		{
			day: 7,
			open: '10:00',
			close: '22:00',
		},
	],
	official: true,
	delivery: true,
	pickup: false,
};
