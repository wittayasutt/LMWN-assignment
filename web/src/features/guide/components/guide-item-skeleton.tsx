import { Skeleton } from '@/components/ui/skeleton';

function GuideItemSkeleton() {
	return (
		<Skeleton className="mb-12 w-full rounded-lg px-4 pb-8 pt-16">
			<Skeleton className="mx-auto mb-4 h-9 w-1/2 rounded-lg bg-gray-200" />
			<Skeleton className="mb-4 mt-10 h-96 rounded-lg bg-gray-200" />
			<Skeleton className="h-18 mx-auto rounded-lg bg-gray-200" />
		</Skeleton>
	);
}

export default GuideItemSkeleton;
