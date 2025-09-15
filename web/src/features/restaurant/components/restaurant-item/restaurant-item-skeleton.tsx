import { Skeleton } from '@/components/ui/skeleton';

function RestaurantItemSkeleton() {
	return (
		<div className="mb-32">
			<div className="mb-4 flex flex-row gap-4">
				<Skeleton className="aspect-square w-[30%]" />
				<Skeleton className="aspect-square w-[30%]" />
				<Skeleton className="aspect-square w-[30%]" />
				<Skeleton className="aspect-square w-[10%]" />
			</div>
			<Skeleton className="mb-4 h-10 w-56" />
			<Skeleton className="mb-4 h-6 w-36" />
			<Skeleton className="mb-4 h-6 w-full" />
			<Skeleton className="mb-4 h-6 w-full" />
			<Skeleton className="h-30 w-full" />
		</div>
	);
}

export default RestaurantItemSkeleton;
