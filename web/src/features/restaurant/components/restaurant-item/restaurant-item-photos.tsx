import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';

import type { PhotoType } from '@/types';

type RestaurantItemPhotosProps = {
	photos: PhotoType[];
	alt: string;
};

function RestaurantItemPhotos({ photos, alt }: RestaurantItemPhotosProps) {
	if (photos?.length === 0) {
		return null;
	}

	return (
		<Carousel>
			<CarouselContent>
				{photos?.map((photo, index) => (
					<CarouselItem key={index} className="basis-[30%]">
						<img
							className="aspect-square w-full object-cover"
							src={photo?.smallUrl ?? ''}
							srcSet={`${photo?.smallUrl ?? ''} 854w, ${photo?.largeUrl ?? ''} 1920w`}
							sizes="(max-width: 1080px) 854px, 1920px"
							alt={`${alt}-${index + 1}`}
							loading="lazy"
						/>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious className="cursor-pointer max-md:hidden" />
			<CarouselNext className="cursor-pointer max-md:hidden" />
		</Carousel>
	);
}

export default RestaurantItemPhotos;
