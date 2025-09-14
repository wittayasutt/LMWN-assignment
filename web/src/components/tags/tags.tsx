import { uniq } from 'lodash';

import { Badge } from '@/components/ui/badge';

function Tags({ tags }: { tags: string[] }) {
	const uniqueTags: string[] = uniq(tags);

	if (uniqueTags?.length === 0) {
		return null;
	}

	return (
		<div className="flex flex-wrap gap-1">
			{uniqueTags?.map((tag) => (
				<Badge
					key={tag}
					className="font-title flex max-w-24 justify-start truncate p-1"
				>
					{tag}
				</Badge>
			))}
		</div>
	);
}

export default Tags;
