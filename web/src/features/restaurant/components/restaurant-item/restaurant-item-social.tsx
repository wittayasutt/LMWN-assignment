import { Facebook, Instagram, Share2 } from 'lucide-react';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import type { RestaurantSocialType } from '../../types';

type RestaurantItemSocialProps = {
	social: RestaurantSocialType;
};

function RestaurantItemSocial({ social }: RestaurantItemSocialProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Share2 className="size-4" />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem>
					<Facebook />
					<span>Facebook</span>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Instagram />
					<span>Instagram</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default RestaurantItemSocial;
