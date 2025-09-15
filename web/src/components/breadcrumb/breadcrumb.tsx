import { Link } from 'react-router-dom';
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
		label: string;
		to?: string;
	}[];
};

function BreadcrumbWithCustomSeparator({
	items,
}: BreadcrumbWithCustomSeparatorProps) {
	return (
		<Breadcrumb>
			<BreadcrumbList>
				{items.map((item, index) => (
					<div key={index} className="flex items-center">
						{index !== 0 && (
							<BreadcrumbSeparator className="mr-2">
								<SlashIcon />
							</BreadcrumbSeparator>
						)}

						<BreadcrumbItem>
							{index === items.length - 1 ? (
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
