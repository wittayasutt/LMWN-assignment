import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { mockGuide } from '@/mock';
import type { GuideType } from '@/types';

import GuideList from './guide-list';
import { useQueryGuideList } from '../api';

vi.mock('../api', () => ({
	useQueryGuideList: vi.fn(),
}));

vi.mock('./', () => ({
	GuideItem: ({ guide }: { guide: GuideType }) => (
		<div data-testid="guide-item">Guide Item: {guide.id}</div>
	),
	GuideItemSkeleton: () => <div data-testid="guide-item-skeleton" />,
}));

const mockUseQueryGuideList = vi.mocked(useQueryGuideList);

describe('GuideList', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe('loading state', () => {
		it('renders 5 skeleton components when loading', () => {
			mockUseQueryGuideList.mockReturnValue({
				data: undefined,
				isLoading: true,
				isError: false,
			} as ReturnType<typeof useQueryGuideList>);

			render(<GuideList />);

			const skeletons = screen.getAllByTestId('guide-item-skeleton');
			expect(skeletons).toHaveLength(5);
		});
	});
});

describe('error state', () => {
	it('shows no data message when isError is true', () => {
		mockUseQueryGuideList.mockReturnValue({
			data: undefined,
			isLoading: false,
			isError: true,
		} as ReturnType<typeof useQueryGuideList>);

		render(<GuideList />);

		expect(screen.getByText('ไม่พบข้อมูลลายแทง')).toBeInTheDocument();
	});

	it('shows no data message when isError is true even with data', () => {
		mockUseQueryGuideList.mockReturnValue({
			data: [mockGuide],
			isLoading: false,
			isError: true,
		} as ReturnType<typeof useQueryGuideList>);

		render(<GuideList />);

		expect(screen.getByText('ไม่พบข้อมูลลายแทง')).toBeInTheDocument();
		expect(screen.queryByTestId('guide-item')).not.toBeInTheDocument();
	});
});

describe('empty data state', () => {
	it('shows no data message when data array is empty', () => {
		mockUseQueryGuideList.mockReturnValue({
			data: [] as GuideType[],
			isLoading: false,
			isError: false,
		} as ReturnType<typeof useQueryGuideList>);

		render(<GuideList />);

		expect(screen.getByText('ไม่พบข้อมูลลายแทง')).toBeInTheDocument();
		expect(screen.queryByTestId('guide-item')).not.toBeInTheDocument();
	});

	it('shows no data message when data is undefined', () => {
		mockUseQueryGuideList.mockReturnValue({
			data: undefined,
			isLoading: false,
			isError: false,
		} as ReturnType<typeof useQueryGuideList>);

		render(<GuideList />);

		expect(screen.getByText('ไม่พบข้อมูลลายแทง')).toBeInTheDocument();
		expect(screen.queryByTestId('guide-item')).not.toBeInTheDocument();
	});

	it('shows no data message when data is null', () => {
		mockUseQueryGuideList.mockReturnValue({
			data: null as unknown as GuideType[],
			isLoading: false,
			isError: false,
		} as ReturnType<typeof useQueryGuideList>);

		render(<GuideList />);

		expect(screen.getByText('ไม่พบข้อมูลลายแทง')).toBeInTheDocument();
		expect(screen.queryByTestId('guide-item')).not.toBeInTheDocument();
	});
});

describe('success state', () => {
	it('renders guide items when data is available', () => {
		const mockGuides = [
			{ ...mockGuide, id: 'guide-1' },
			{ ...mockGuide, id: 'guide-2' },
			{ ...mockGuide, id: 'guide-3' },
		];

		mockUseQueryGuideList.mockReturnValue({
			data: mockGuides,
			isLoading: false,
			isError: false,
		} as ReturnType<typeof useQueryGuideList>);

		render(<GuideList />);

		expect(screen.getByText('Guide Item: guide-1')).toBeInTheDocument();
		expect(screen.getByText('Guide Item: guide-2')).toBeInTheDocument();
		expect(screen.getByText('Guide Item: guide-3')).toBeInTheDocument();

		const guideItems = screen.getAllByTestId('guide-item');
		expect(guideItems).toHaveLength(3);

		expect(screen.queryByTestId('guide-item-skeleton')).not.toBeInTheDocument();
		expect(screen.queryByText('ไม่พบข้อมูลลายแทง')).not.toBeInTheDocument();
	});

	it('renders single guide item correctly', () => {
		mockUseQueryGuideList.mockReturnValue({
			data: [mockGuide],
			isLoading: false,
			isError: false,
		} as ReturnType<typeof useQueryGuideList>);

		render(<GuideList />);

		expect(screen.getByText(`Guide Item: ${mockGuide.id}`)).toBeInTheDocument();
		expect(screen.getAllByTestId('guide-item')).toHaveLength(1);
	});
});
