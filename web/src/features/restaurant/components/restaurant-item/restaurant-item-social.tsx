import {
	ClipboardCheck,
	Facebook,
	Instagram,
	Link,
	Share2,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCopyToClipboard } from '@/hooks';

import type { RestaurantSocialType } from '@/types';

type RestaurantItemSocialProps = {
	social: RestaurantSocialType;
};

function RestaurantItemSocial({ social }: RestaurantItemSocialProps) {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, copy] = useCopyToClipboard();
	const [isCopied, setIsCopied] = useState<boolean>(false);

	const renderData = [
		social.instagram && {
			icon: Instagram,
			label: 'Instagram',
			url: `https://www.instagram.com/${social.instagram}`,
		},
		social.facebook && {
			icon: Facebook,
			label: 'Facebook',
			url: `https://www.facebook.com/${social.facebook}`,
		},
		social.url && {
			icon: Link,
			label: 'Website',
			url: social.url,
		},
	].filter(Boolean);

	const handleCopy = (text: string) => {
		copy(text);
		toast(`${text} คัดลอกแล้ว`);
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
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					size="icon"
					className="size-10 cursor-pointer"
				>
					{isCopied ? (
						<ClipboardCheck className="size-4" />
					) : (
						<Share2 className="size-4" />
					)}
				</Button>
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
