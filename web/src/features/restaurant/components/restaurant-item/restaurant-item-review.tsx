type RestaurantItemReviewProps = {
	numberOfReviews?: number | null;
	rating?: number | null;
};

function RestaurantItemReview({
	numberOfReviews,
	rating,
}: RestaurantItemReviewProps) {
	if ((numberOfReviews != null && numberOfReviews <= 0) || !rating) {
		return null;
	}

	return (
		<p className="font-title sm:text-md text-sm leading-relaxed text-gray-400">
			คะแนนเฉลี่ย {rating} / 5
		</p>
	);
}

export default RestaurantItemReview;
