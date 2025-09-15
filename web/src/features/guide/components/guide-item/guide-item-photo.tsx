import type { PhotoType } from '@/types';

type GuideItemPhotoProps = {
	alt?: string;
	photo?: PhotoType;
	isTitle?: boolean;
};

function GuideItemPhoto({ alt, photo, isTitle = false }: GuideItemPhotoProps) {
	if (!photo?.smallUrl && !photo?.largeUrl) {
		return null;
	}

	return (
		<img
			className="aspect-[16/9] w-full bg-gray-200"
			src={photo?.smallUrl ?? ''}
			srcSet={`${photo?.smallUrl ?? ''} 854w, ${photo?.largeUrl ?? ''} 1920w`}
			sizes="(max-width: 1080px) 854px, 1920px"
			alt={alt ?? ''}
			loading={isTitle ? 'eager' : 'lazy'}
		/>
	);
}

export default GuideItemPhoto;
