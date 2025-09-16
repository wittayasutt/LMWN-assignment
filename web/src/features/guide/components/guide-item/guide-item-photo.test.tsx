import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { PhotoType } from '@/types';

import GuideItemPhoto from './guide-item-photo';

const mockPhoto: PhotoType = {
	id: '1',
	smallUrl: 'https://example.com/small.jpg',
	largeUrl: 'https://example.com/large.jpg',
};

const mockPhotoOnlySmall: PhotoType = {
	id: '2',
	smallUrl: 'https://example.com/small.jpg',
	largeUrl: null,
};

const mockPhotoOnlyLarge: PhotoType = {
	id: '3',
	smallUrl: '',
	largeUrl: 'https://example.com/large.jpg',
};

const mockPhotoNoUrls: PhotoType = {
	id: '4',
	smallUrl: null,
	largeUrl: null,
};

describe('GuideItemPhoto', () => {
	it('renders nothing when photo has no URLs', () => {
		const { container } = render(
			<GuideItemPhoto photo={mockPhotoNoUrls} alt="Guide photo" />,
		);

		expect(container.firstChild).toBeNull();
	});

	it('renders nothing when photo is undefined', () => {
		const { container } = render(
			<GuideItemPhoto photo={undefined} alt="Guide photo" />,
		);

		expect(container.firstChild).toBeNull();
	});

	it('renders image with correct attributes when both URLs are provided', () => {
		render(<GuideItemPhoto photo={mockPhoto} alt="Guide photo" />);

		const imageElement = screen.getByAltText('Guide photo');
		expect(imageElement).toBeInTheDocument();
		expect(imageElement).toHaveAttribute(
			'src',
			'https://example.com/small.jpg',
		);
		expect(imageElement).toHaveAttribute(
			'srcset',
			'https://example.com/small.jpg 854w, https://example.com/large.jpg 1920w',
		);
		expect(imageElement).toHaveAttribute(
			'sizes',
			'(max-width: 1080px) 854px, 1920px',
		);
	});

	it('renders image with only small URL when large URL is null', () => {
		render(<GuideItemPhoto photo={mockPhotoOnlySmall} alt="Guide photo" />);

		const imageElement = screen.getByAltText('Guide photo');
		expect(imageElement).toBeInTheDocument();
		expect(imageElement).toHaveAttribute(
			'src',
			'https://example.com/small.jpg',
		);
		expect(imageElement).toHaveAttribute(
			'srcset',
			'https://example.com/small.jpg 854w,  1920w',
		);
	});

	it('renders image with only large URL when small URL is empty', () => {
		render(<GuideItemPhoto photo={mockPhotoOnlyLarge} alt="Guide photo" />);

		const imageElement = screen.getByAltText('Guide photo');
		expect(imageElement).toBeInTheDocument();
		expect(imageElement).toHaveProperty('src', '');
		expect(imageElement).toHaveAttribute(
			'srcset',
			' 854w, https://example.com/large.jpg 1920w',
		);
	});

	it('uses eager loading when isTitle is true', () => {
		render(
			<GuideItemPhoto photo={mockPhoto} alt="Guide photo" isTitle={true} />,
		);

		const imageElement = screen.getByAltText('Guide photo');
		expect(imageElement).toHaveAttribute('loading', 'eager');
	});

	it('uses lazy loading when isTitle is false', () => {
		render(
			<GuideItemPhoto photo={mockPhoto} alt="Guide photo" isTitle={false} />,
		);

		const imageElement = screen.getByAltText('Guide photo');
		expect(imageElement).toHaveAttribute('loading', 'lazy');
	});

	it('uses lazy loading by default when isTitle is not provided', () => {
		render(<GuideItemPhoto photo={mockPhoto} alt="Guide photo" />);

		const imageElement = screen.getByAltText('Guide photo');
		expect(imageElement).toHaveAttribute('loading', 'lazy');
	});

	it('uses empty alt text when alt prop is not provided', () => {
		render(<GuideItemPhoto photo={mockPhoto} />);

		const imageElement = screen.getByAltText('');
		expect(imageElement).toHaveAttribute('alt', '');
	});

	it('uses provided alt text', () => {
		render(<GuideItemPhoto photo={mockPhoto} alt="Custom alt text" />);

		const imageElement = screen.getByAltText('Custom alt text');
		expect(imageElement).toBeInTheDocument();
	});
});
