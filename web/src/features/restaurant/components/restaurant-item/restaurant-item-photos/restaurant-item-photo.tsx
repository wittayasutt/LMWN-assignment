import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

import type { PhotoType } from '@/types';

type RestaurantItemPhotoProps = {
	alt: string;
	index: number;
	photo: PhotoType;
};

function RestaurantItemPhoto({ alt, index, photo }: RestaurantItemPhotoProps) {
	if (!photo) {
		return null;
	}

	return (
		<Dialog>
			<DialogTrigger>
				<img
					className="aspect-square w-full cursor-pointer bg-gray-100 object-cover"
					src={photo?.smallUrl ?? ''}
					srcSet={`${photo?.smallUrl ?? ''} 854w, ${photo?.largeUrl ?? ''} 1920w`}
					sizes="(max-width: 1080px) 854px, 1920px"
					alt={`${alt}-${index + 1}`}
					loading="lazy"
				/>
			</DialogTrigger>
			<DialogContent className="max-w-8/12 w-full overflow-hidden rounded-none border-0 p-0">
				<DialogTitle className="hidden">{alt}</DialogTitle>
				<DialogDescription className="hidden">{alt}</DialogDescription>
				<img
					src={photo?.smallUrl ?? ''}
					srcSet={`${photo?.smallUrl ?? ''} 854w, ${photo?.largeUrl ?? ''} 1920w`}
					sizes="(max-width: 1080px) 854px, 1920px"
					alt={alt}
					loading="lazy"
				/>
			</DialogContent>
		</Dialog>
	);
}

export default RestaurantItemPhoto;
