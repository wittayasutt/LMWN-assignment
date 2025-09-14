import GuideItem from './guide-item';

import { useQueryGuideList } from '../api';
import type { GuideType } from '../types';

// TODO: remove mock data
const mockData: GuideType[] = [
	{
		id: 'e1bfd2d3-f0fb-470e-bdd3-be884fdd8dfb',
		title: '10 คาเฟ่ลับ One Bangkok!',
		socialTitle:
			'ไม่อยากจะเชื่อ มีร้านคาเฟ่ดี ๆ แบบนี้ห้างดังย่านลุมพินี One Bangkok ด้วย',
		shortDescription: 'รวมคาเฟ่เด็ดที่ One Bangkok',
		description:
			'รวมสุดยอดคาเฟ่ลับ ที่จะพาคุณไปหลงทาง เอ้ย! หลงไหล ในกลิ่นกาแฟอันหอมหวน และ บรรยากาศร้านติดแกรม กินแล้วจะติดใจ',
		coverPhoto: {
			id: '63ce2123-b49a-49cc-bc13-80ed802a7894',
			smallUrl: 'http://localhost:7777/r/854/480/20240902_091058.jpg',
			largeUrl: 'http://localhost:7777/r/1920/1080/20240902_091058.jpg',
		},
		tags: ['กาแฟ', 'คาเฟ่', 'กรุงเทพ', 'One', 'Bangkok'],
		writeDate: '2024-03-10T12:00:00.000Z',
		createdAt: '2024-03-10T12:00:00.000Z',
		updatedAt: '2024-03-10T12:00:00.000Z',
	},

	{
		id: '34c790dd-123b-499b-ba55-ea2f5befb452',
		title: '10 คาเฟ่ลับ One Bangkok!',
		socialTitle:
			'ไม่อยากจะเชื่อ มีร้านคาเฟ่ดี ๆ แบบนี้ห้างดังย่านลุมพินี One Bangkok ด้วย',
		shortDescription: 'รวมคาเฟ่เด็ดที่ One Bangkok',
		description:
			'รวมสุดยอดคาเฟ่ลับ ที่จะพาคุณไปหลงทาง เอ้ย! หลงไหล ในกลิ่นกาแฟอันหอมหวน และ บรรยากาศร้านติดแกรม กินแล้วจะติดใจ',
		coverPhoto: {
			id: '63ce2123-b49a-49cc-bc13-80ed802a7894',
			smallUrl: 'http://localhost:7777/r/854/480/20240902_091058.jpg',
			largeUrl: 'http://localhost:7777/r/1920/1080/20240902_091058.jpg',
		},
		tags: ['กาแฟ', 'คาเฟ่', 'กรุงเทพ', 'One', 'Bangkok'],
		writeDate: '2024-03-10T12:00:00.000Z',
		createdAt: '2024-03-10T12:00:00.000Z',
		updatedAt: '2024-03-10T12:00:00.000Z',
	},
];

function GuideList() {
	const { data } = useQueryGuideList();

	// TODO: fetch guides from API
	const guides: GuideType[] = mockData;

	return guides.map((guide) => <GuideItem key={guide.id} guide={guide} />);
}

export default GuideList;
