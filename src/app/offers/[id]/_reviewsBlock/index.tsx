import css from './Reviews.module.scss';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import {Text} from '@/components/Text';
import {loadReviews} from '@/api/reviews';
import {Review} from '@/types/review';
import {format} from 'date-fns';
import {Rating} from '@/components/Rating';
import Link from 'next/link';
import {Button} from '@/components/Button';
import {omitCurrentYear} from '@/shared/date/omitCurrentYear';
import {Offer} from '@/types/offers';
import {ReviewsBlockHeader} from './Header';

function ReviewsItem(review: Review) {
    return (
        <Column className={css.reviewsItem} gap={1} paddingX={2} paddingY={2}>
            <Text>{review.authorName}</Text>
            <Text size={10} weight={400} color="#303234A3">
                {omitCurrentYear(format(new Date(review.createdAt), 'dd MMMM yyyy'))}
            </Text>
            <Rating rating={review.rating} />
            <Text>{review.text}</Text>
        </Column>
    );
}

type Props = {
    offer: Offer;
    reviewsCount: number;
    rating?: number;
};

export default async function Reviews({offer, reviewsCount, rating = 0}: Props) {
    const reviews = await loadReviews({offerId: offer.id});

    return (
        <Column gap={3}>
            <ReviewsBlockHeader offer={offer} reviewsCount={reviewsCount} />
            {rating && (
                <Row alignItems="center" gap={2}>
                    <Text size="12px" weight={400}>
                        {rating}
                    </Text>
                    <Rating rating={rating} />
                </Row>
            )}
            {reviews.length > 0 && (
                <Row className={css.reviewsList} gap={2}>
                    {reviews.slice(0, 3).map(review => (
                        <ReviewsItem key={review.id} {...review} />
                    ))}
                </Row>
            )}
            {reviews.length === 0 && (
                <Text align="center" weight="500" size="12px" height={14}>
                    Будьте первым кто оставил отзыв
                </Text>
            )}
            {reviews.length > 0 && (
                <Link href={`/offers/${offer.id}/reviews`}>
                    <Row justifyContent="center">
                        <Button variant="pseudo">
                            <Text weight="500" size="12px" height={14} decoration="underline">
                                Все отзывы
                            </Text>
                        </Button>
                    </Row>
                </Link>
            )}
        </Column>
    );
}
