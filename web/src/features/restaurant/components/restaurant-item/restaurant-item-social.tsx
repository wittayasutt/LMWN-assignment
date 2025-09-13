import { ClipboardCheck, Facebook, Instagram, Share2 } from 'lucide-react';
import { useEffect, useState } from 'react';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCopyToClipboard } from '@/hooks';

import type { RestaurantSocialType } from '../../types';

type RestaurantItemSocialProps = {
	social: RestaurantSocialType;
};

function RestaurantItemSocial({ social }: RestaurantItemSocialProps) {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, copy] = useCopyToClipboard();
	const [isCopied, setIsCopied] = useState<boolean>(false);

	const renderData = [
		social.facebook && {
			icon: Facebook,
			label: 'Facebook',
			url: `https://www.facebook.com/${social.facebook}`,
		},
		social.instagram && {
			icon: Instagram,
			label: 'Instagram',
			url: `https://www.instagram.com/${social.instagram}`,
		},
	];

	const handleCopy = (text: string) => {
		copy(text);
		setIsCopied(true);
	};

	useEffect(() => {
		if (isCopied) {
			const timeout = setTimeout(() => {
				setIsCopied(false);
			}, 1000);

			return () => clearTimeout(timeout);
		}
	}, [isCopied]);

	if (renderData.length === 0) {
		return null;
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="hover:bg-accent cursor-pointer p-1">
				{isCopied ? (
					<ClipboardCheck className="size-4" />
				) : (
					<Share2 className="size-4" />
				)}
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				{renderData.map(
					(item) =>
						item && (
							<DropdownMenuItem
								key={item.label}
								className="font-title cursor-pointer"
								onClick={() => handleCopy(item.url)}
							>
								<item.icon />
								<span>{item.label}</span>
							</DropdownMenuItem>
						),
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default RestaurantItemSocial;
