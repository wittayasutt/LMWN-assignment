import { Badge } from '@/components/ui/badge';
import { uniq } from 'lodash';

function Tags({ tags }: { tags: string[] }) {
	const uniqueTags: string[] = uniq(tags);

	return (
		<div className="flex flex-wrap gap-1">
			{uniqueTags.map((tag) => (
				<Badge key={tag} className="flex max-w-24 justify-start truncate p-1">
					{tag}
				</Badge>
			))}
		</div>
	);
}

export default Tags;
