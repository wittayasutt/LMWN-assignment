import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';

import type { PhotoType } from '@/types';

type RestaurantItemPhotosProps = {
	alt: string;
	className?: string;
	photos: PhotoType[];
};

function RestaurantItemPhotos({
	alt,
	className,
	photos,
}: RestaurantItemPhotosProps) {
	if (photos?.length === 0) {
		return null;
	}

	return (
		<Carousel className={className}>
			<CarouselContent>
				{photos?.map((photo, index) => (
					<CarouselItem key={index} className="basis-[30%]">
						<img
							className="aspect-square w-full bg-gray-100 object-cover"
							src={photo?.smallUrl ?? ''}
							srcSet={`${photo?.smallUrl ?? ''} 854w, ${photo?.largeUrl ?? ''} 1920w`}
							sizes="(max-width: 1080px) 854px, 1920px"
							alt={`${alt}-${index + 1}`}
							loading="lazy"
						/>
					</CarouselItem>
				))}
			</CarouselContent>
			{photos.length > 3 ? (
				<>
					<CarouselPrevious className="cursor-pointer max-md:hidden" />
					<CarouselNext className="cursor-pointer max-md:hidden" />
				</>
			) : null}
		</Carousel>
	);
}

export default RestaurantItemPhotos;
