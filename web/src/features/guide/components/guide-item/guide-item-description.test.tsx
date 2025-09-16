import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import GuideItemDescription from './guide-item-description';

describe('GuideItemDescription', () => {
	it('renders nothing when description is null', () => {
		const { container } = render(<GuideItemDescription description={null} />);

		expect(container.firstChild).toBeNull();
	});

	it('renders nothing when description is undefined', () => {
		const { container } = render(
			<GuideItemDescription description={undefined} />,
		);

		expect(container.firstChild).toBeNull();
	});

	it('handles empty string description', () => {
		const { container } = render(<GuideItemDescription description="" />);

		expect(container.firstChild).toBeNull();
	});

	it('renders description text when provided', () => {
		const description = 'This is a great guide with amazing recommendations.';

		render(<GuideItemDescription description={description} />);
		expect(screen.getByText(description)).toBeInTheDocument();
	});

	it('applies line-clamp-5 class by default', () => {
		const description = 'This is a great guide with amazing recommendations.';

		render(<GuideItemDescription description={description} />);

		const paragraph = screen.getByText(description);
		expect(paragraph).toHaveClass('line-clamp-5');
		expect(paragraph).not.toHaveClass('line-clamp-none');
	});

	it('does not expand when clicked and isTitle is false', async () => {
		const user = userEvent.setup();
		const description = 'This is a great guide with amazing recommendations.';

		render(<GuideItemDescription description={description} isTitle={false} />);

		const container = screen.getByText(description).closest('div');
		const paragraph = screen.getByText(description);

		expect(paragraph).toHaveClass('line-clamp-5');

		await user.click(container!);

		expect(paragraph).toHaveClass('line-clamp-5');
		expect(paragraph).not.toHaveClass('line-clamp-none');
	});

	it('expands description when clicked and isTitle is true', async () => {
		const user = userEvent.setup();
		const description = 'This is a great guide with amazing recommendations.';

		render(<GuideItemDescription description={description} isTitle={true} />);

		const container = screen.getByText(description).closest('div');
		const paragraph = screen.getByText(description);

		expect(paragraph).toHaveClass('line-clamp-5');

		await user.click(container!);

		expect(paragraph).toHaveClass('line-clamp-none');
		expect(paragraph).not.toHaveClass('line-clamp-5');
	});

	it('remains expanded after being clicked when isTitle is true', async () => {
		const user = userEvent.setup();
		const description = 'This is a great guide with amazing recommendations.';

		render(<GuideItemDescription description={description} isTitle={true} />);

		const container = screen.getByText(description).closest('div');
		const paragraph = screen.getByText(description);

		await user.click(container!);
		expect(paragraph).toHaveClass('line-clamp-none');

		await user.click(container!);
		expect(paragraph).toHaveClass('line-clamp-none');
	});
});
