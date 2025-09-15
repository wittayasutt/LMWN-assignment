import { Skeleton } from '@/components/ui/skeleton';

function GuideItemSkeleton() {
	return (
		<Skeleton className="smLmb-12 mb-8 w-full rounded-lg px-4 pb-8 pt-8 sm:pt-16">
			<Skeleton className="mx-auto mb-4 h-9 w-1/2 rounded-lg bg-gray-200" />
			<Skeleton className="mb-4 mt-8 h-96 rounded-lg bg-gray-200 sm:mt-10" />
			<Skeleton className="h-18 mx-auto rounded-lg bg-gray-200" />
		</Skeleton>
	);
}

export default GuideItemSkeleton;
