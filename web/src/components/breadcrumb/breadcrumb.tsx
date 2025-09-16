import { Link } from 'react-router';
import { SlashIcon } from 'lucide-react';

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

type BreadcrumbWithCustomSeparatorProps = {
	items: {
		label?: string;
		to?: string;
	}[];
};

function BreadcrumbWithCustomSeparator({
	items,
}: BreadcrumbWithCustomSeparatorProps) {
	const renderItems = items.filter((item) => item.label);

	return (
		<Breadcrumb>
			<BreadcrumbList>
				{renderItems.map((item, index) => (
					<div key={index} className="flex items-center">
						{index !== 0 && (
							<BreadcrumbSeparator className="mr-2">
								<SlashIcon />
							</BreadcrumbSeparator>
						)}

						<BreadcrumbItem>
							{index === renderItems.length - 1 ? (
								<BreadcrumbPage className="font-title">
									{item?.label ?? ''}
								</BreadcrumbPage>
							) : (
								<BreadcrumbLink className="font-title" asChild>
									<Link to={item?.to ?? '/'}>{item?.label ?? ''}</Link>
								</BreadcrumbLink>
							)}
						</BreadcrumbItem>
					</div>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	);
}

export default BreadcrumbWithCustomSeparator;
