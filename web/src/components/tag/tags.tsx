import uniq from 'lodash.uniq';
import { Badge } from '@/components/ui/badge';

type TagsProps = {
	tags: string[];
	variant?: 'default' | 'secondary' | 'destructive' | 'outline' | null;
};

function Tags({ tags, variant = 'default' }: TagsProps) {
	const uniqueTags: string[] = uniq(tags);
	const renderTags = uniqueTags.filter(Boolean);

	if (renderTags?.length === 0) {
		return null;
	}

	return (
		<div className="flex flex-wrap gap-3">
			{renderTags?.map((tag) => (
				<Badge
					key={tag}
					className="font-title flex flex-wrap px-4 py-1 shadow-sm"
					variant={variant}
				>
					{tag}
				</Badge>
			))}
		</div>
	);
}

export default Tags;
