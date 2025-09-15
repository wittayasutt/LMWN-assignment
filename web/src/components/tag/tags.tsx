import uniq from 'lodash.uniq';

import { Badge } from '@/components/ui/badge';

function Tags({ tags }: { tags: string[] }) {
	const uniqueTags: string[] = uniq(tags);

	if (uniqueTags?.length === 0) {
		return null;
	}

	return (
		<div className="flex flex-wrap gap-3">
			{uniqueTags?.map((tag) => (
				<Badge
					key={tag}
					className="font-title flex max-w-24 justify-start truncate px-4 py-1 shadow-sm"
					variant="secondary"
				>
					{tag}
				</Badge>
			))}
		</div>
	);
}

export default Tags;
