import type { PhotoType } from '@/types';

export type GuideItemPhotoProps = {
	alt?: string;
	photo?: PhotoType;
	isTitle?: boolean;
	isPriority?: boolean;
};

function GuideItemPhoto({
	alt,
	photo,
	isTitle = false,
	isPriority = false,
}: GuideItemPhotoProps) {
	if (!photo?.smallUrl && !photo?.largeUrl) {
		return null;
	}

	const isPriorityLoading = isTitle || isPriority;

	return (
		<img
			className="aspect-[16/9] w-full bg-gray-200"
			src={photo?.smallUrl ?? ''}
			srcSet={`${photo?.smallUrl ?? ''} 854w, ${photo?.largeUrl ?? ''} 1920w`}
			sizes="(max-width: 1080px) 854px, 1920px"
			alt={alt ?? ''}
			loading={isPriorityLoading ? 'eager' : 'lazy'}
			fetchPriority={isPriorityLoading ? 'high' : 'auto'}
		/>
	);
}

export default GuideItemPhoto;
