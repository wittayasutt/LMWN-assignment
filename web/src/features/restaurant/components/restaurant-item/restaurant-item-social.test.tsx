import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { RestaurantSocialType } from '@/types';

import RestaurantItemSocial from './restaurant-item-social';

vi.mock('sonner', () => ({
	toast: vi.fn(),
}));

const mockCopy = vi.fn();
vi.mock('@/hooks', () => ({
	useCopyToClipboard: () => [null, mockCopy],
}));

describe('RestaurantItemSocial', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		vi.useFakeTimers();
		mockCopy.mockResolvedValue(true);
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	const mockSocialWithAll: RestaurantSocialType = {
		instagram: 'restaurant_instagram',
		facebook: 'restaurant_facebook',
		url: 'https://restaurant-website.com',
	};

	const mockSocialWithInstagramOnly: RestaurantSocialType = {
		instagram: 'restaurant_instagram',
		facebook: null,
		url: null,
	};

	const mockSocialEmpty: RestaurantSocialType = {
		instagram: null,
		facebook: null,
		url: null,
	};

	it('renders nothing when no social media links are provided', () => {
		const { container } = render(
			<RestaurantItemSocial social={mockSocialEmpty} />,
		);
		expect(container.firstChild).toBeNull();
	});

	it('renders share button when at least one social media link is provided', () => {
		render(<RestaurantItemSocial social={mockSocialWithInstagramOnly} />);

		const shareButton = screen.getByRole('button');
		expect(shareButton).toBeInTheDocument();
	});

	it('displays Share2 icon initially', () => {
		render(<RestaurantItemSocial social={mockSocialWithInstagramOnly} />);

		const shareButton = screen.getByRole('button');
		expect(shareButton.querySelector('svg')).toBeInTheDocument();
	});

	it('renders component when instagram handle is provided', () => {
		render(<RestaurantItemSocial social={mockSocialWithInstagramOnly} />);

		const shareButton = screen.getByRole('button');
		expect(shareButton).toBeInTheDocument();
	});

	it('renders component when facebook handle is provided', () => {
		render(
			<RestaurantItemSocial social={{ facebook: 'restaurant_facebook' }} />,
		);

		const shareButton = screen.getByRole('button');
		expect(shareButton).toBeInTheDocument();
	});

	it('renders component when url is provided', () => {
		render(
			<RestaurantItemSocial
				social={{ url: 'https://restaurant-website.com' }}
			/>,
		);

		const shareButton = screen.getByRole('button');
		expect(shareButton).toBeInTheDocument();
	});

	it('renders component when all social media options are provided', () => {
		render(<RestaurantItemSocial social={mockSocialWithAll} />);

		const shareButton = screen.getByRole('button');
		expect(shareButton).toBeInTheDocument();
	});

	it('handles mixed social media data correctly', () => {
		const mixedSocial: RestaurantSocialType = {
			instagram: 'test_instagram',
			facebook: null,
			url: 'https://test-website.com',
		};

		render(<RestaurantItemSocial social={mixedSocial} />);

		const shareButton = screen.getByRole('button');
		expect(shareButton).toBeInTheDocument();
	});

	it('handles empty string values as falsy', () => {
		const emptySocial: RestaurantSocialType = {
			instagram: '',
			facebook: '',
			url: '',
		};

		const { container } = render(<RestaurantItemSocial social={emptySocial} />);
		expect(container.firstChild).toBeNull();
	});

	it('handles undefined values as falsy', () => {
		const undefinedSocial: RestaurantSocialType = {
			instagram: undefined,
			facebook: undefined,
			url: undefined,
		};

		const { container } = render(
			<RestaurantItemSocial social={undefinedSocial} />,
		);
		expect(container.firstChild).toBeNull();
	});

	it('renders component when only one field is truthy', () => {
		const partialSocial: RestaurantSocialType = {
			instagram: 'test_handle',
			facebook: '',
			url: null,
		};

		render(<RestaurantItemSocial social={partialSocial} />);

		const shareButton = screen.getByRole('button');
		expect(shareButton).toBeInTheDocument();
	});

	it('component has correct accessibility attributes', () => {
		render(<RestaurantItemSocial social={mockSocialWithInstagramOnly} />);

		const shareButton = screen.getByRole('button');
		expect(shareButton).toHaveAttribute('type', 'button');
	});

	it('component mounts and unmounts without errors', () => {
		const { unmount } = render(
			<RestaurantItemSocial social={mockSocialWithAll} />,
		);
		expect(() => unmount()).not.toThrow();
	});
});
