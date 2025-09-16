import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';
import type { PhotoType } from '@/types';

import { RestaurantItemPhoto } from '.';

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
						<RestaurantItemPhoto alt={alt} index={index} photo={photo} />
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
