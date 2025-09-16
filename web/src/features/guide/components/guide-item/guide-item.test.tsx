import { MemoryRouter } from 'react-router';
import { describe, it, expect, vi } from 'vitest';
import { mockGuide } from '@/mock';
import { render, screen } from '@testing-library/react';
import type { GuideType } from '@/types';

import GuideItem from './guide-item';
import type { GuideItemDescriptionProps } from './guide-item-description';
import type { GuideItemPhotoProps } from './guide-item-photo';

vi.mock('./guide-item-photo', () => ({
	default: ({ photo, alt, isTitle }: GuideItemPhotoProps) => (
		<div data-testid="guide-item-photo">
			Photo: {photo?.id || 'none'}, Alt: {alt}, IsTitle: {isTitle?.toString()}
		</div>
	),
}));

vi.mock('./guide-item-description', () => ({
	default: ({ description, isTitle }: GuideItemDescriptionProps) => (
		<div data-testid="guide-item-description">
			Description: {description || 'none'}, IsTitle: {isTitle?.toString()}
		</div>
	),
}));

vi.mock('@/components/tag', () => ({
	Tags: ({ tags, variant }: { tags?: string[]; variant?: string }) => (
		<div data-testid="tags">
			Tags: {tags ? tags.join(', ') : 'none'}, Variant: {variant}
		</div>
	),
}));

vi.mock('@/components/ui/button', () => ({
	Button: ({
		children,
		className,
	}: {
		children: React.ReactNode;
		className?: string;
	}) => (
		<button data-testid="button" className={className}>
			{children}
		</button>
	),
}));

describe('GuideItem', () => {
	describe('when isTitle is false (default link mode)', () => {
		it('renders as a link with proper structure', () => {
			render(
				<MemoryRouter>
					<GuideItem guide={mockGuide} />
				</MemoryRouter>,
			);

			const link = screen.getByRole('link');
			expect(link).toBeInTheDocument();
			expect(link).toHaveAttribute(
				'href',
				'/guide/e1bfd2d3-f0fb-470e-bdd3-be884fdd8dfb',
			);

			expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
				'10 คาเฟ่ลับ One Bangkok!',
			);
			expect(screen.getByTestId('tags')).toHaveTextContent(
				'Tags: กาแฟ, คาเฟ่, กรุงเทพ, One, Bangkok, Variant: secondary',
			);
			expect(screen.getByTestId('guide-item-photo')).toHaveTextContent(
				'Photo: 63ce2123-b49a-49cc-bc13-80ed802a7894, Alt: 10 คาเฟ่ลับ One Bangkok!, IsTitle: false',
			);
			expect(screen.getByTestId('guide-item-description')).toHaveTextContent(
				'Description: รวมสุดยอดคาเฟ่ลับ ที่จะพาคุณไปหลงทาง เอ้ย! หลงไหล ในกลิ่นกาแฟอันหอมหวน และ บรรยากาศร้านติดแกรม กินแล้วจะติดใจ, IsTitle: false',
			);
			expect(screen.getByTestId('button')).toHaveTextContent('อ่านเพิ่มเติม');
		});

		it('handles guide without tags', () => {
			const guideWithoutTags = { ...mockGuide, tags: undefined };
			render(
				<MemoryRouter>
					<GuideItem guide={guideWithoutTags} />
				</MemoryRouter>,
			);

			expect(screen.queryByTestId('tags')).not.toBeInTheDocument();
		});

		it('handles guide without id by linking to home', () => {
			render(
				<MemoryRouter>
					<GuideItem guide={{ id: '', title: 'No ID Guide' } as GuideType} />
				</MemoryRouter>,
			);

			const link = screen.getByRole('link');
			expect(link).toHaveAttribute('href', '/');
		});

		it('handles empty title gracefully', () => {
			const guideWithoutTitle = { ...mockGuide, title: '' };
			render(
				<MemoryRouter>
					<GuideItem guide={guideWithoutTitle} />
				</MemoryRouter>,
			);

			const heading = screen.getByRole('heading', { level: 2 });
			expect(heading).toHaveTextContent('');
		});
	});

	describe('when isTitle is true (title display mode)', () => {
		it('renders without link wrapper', () => {
			render(
				<MemoryRouter>
					<GuideItem guide={mockGuide} isTitle />
				</MemoryRouter>,
			);

			expect(screen.queryByRole('link')).not.toBeInTheDocument();
			expect(screen.queryByTestId('button')).not.toBeInTheDocument();
		});

		it('renders h1 instead of h2 for title', () => {
			render(
				<MemoryRouter>
					<GuideItem guide={mockGuide} isTitle />
				</MemoryRouter>,
			);

			expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
				'10 คาเฟ่ลับ One Bangkok!',
			);
			expect(
				screen.queryByRole('heading', { level: 2 }),
			).not.toBeInTheDocument();
		});

		it('passes isTitle=true to child components', () => {
			render(
				<MemoryRouter>
					<GuideItem guide={mockGuide} isTitle />
				</MemoryRouter>,
			);

			expect(screen.getByTestId('guide-item-photo')).toHaveTextContent(
				'Photo: 63ce2123-b49a-49cc-bc13-80ed802a7894, Alt: 10 คาเฟ่ลับ One Bangkok!, IsTitle: true',
			);
			expect(screen.getByTestId('guide-item-description')).toHaveTextContent(
				'Description: รวมสุดยอดคาเฟ่ลับ ที่จะพาคุณไปหลงทาง เอ้ย! หลงไหล ในกลิ่นกาแฟอันหอมหวน และ บรรยากาศร้านติดแกรม กินแล้วจะติดใจ, IsTitle: true',
			);
		});
	});

	describe('edge cases and null handling', () => {
		it('handles minimal guide data', () => {
			render(
				<MemoryRouter>
					<GuideItem
						guide={{ id: 'guide-2', title: 'Minimal Guide' } as GuideType}
					/>
				</MemoryRouter>,
			);

			expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
				'Minimal Guide',
			);
			expect(screen.queryByTestId('tags')).not.toBeInTheDocument();
		});

		it('handles null title gracefully', () => {
			const guideWithNullTitle = {
				...mockGuide,
				title: null as unknown as string,
			};
			render(
				<MemoryRouter>
					<GuideItem guide={guideWithNullTitle} />
				</MemoryRouter>,
			);

			const heading = screen.getByRole('heading', { level: 2 });
			expect(heading).toHaveTextContent('');
		});

		it('handles undefined title gracefully', () => {
			const guideWithUndefinedTitle = {
				...mockGuide,
				title: undefined as unknown as string,
			};
			render(
				<MemoryRouter>
					<GuideItem guide={guideWithUndefinedTitle} />
				</MemoryRouter>,
			);

			const heading = screen.getByRole('heading', { level: 2 });
			expect(heading).toHaveTextContent('');
		});
	});

	describe('accessibility', () => {
		it('uses proper heading hierarchy', () => {
			render(
				<MemoryRouter>
					<GuideItem guide={mockGuide} />
				</MemoryRouter>,
			);

			expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
		});

		it('uses h1 for title mode', () => {
			render(
				<MemoryRouter>
					<GuideItem guide={mockGuide} isTitle />
				</MemoryRouter>,
			);

			expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
		});
	});
});
