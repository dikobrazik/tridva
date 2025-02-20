import css from './Reviews.module.scss';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import {Text} from '@/components/Text';
import {loadHasReview, loadReviews} from '@/api';
import {Review} from '@/types/review';
import {format} from 'date-fns';
import {Rating} from '@/components/Rating';
import Link from 'next/link';
import {Button} from '@/components/Button';
import {omitCurrentYear} from '@/shared/date/omitCurrentYear';
import {Offer} from '@/types/offers';
import {ReviewsBlockHeader} from './Header';
import {pluralize} from '@/shared/utils/pluralize';
import {Block} from '@/components/layout/Block';

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
};

export default async function Reviews({offer}: Props) {
    const [reviews, hasReview] = await Promise.all([
        loadReviews({offerId: offer.id, pageSize: 10}),
        loadHasReview({offerId: offer.id}),
    ]);

    const {reviewsCount, ratingsCount, rating = 0} = offer;

    return (
        <Block id="reviews" gap={3}>
            <ReviewsBlockHeader offer={offer} reviewsCount={reviewsCount} hasReview={hasReview} />
            {rating && (
                <Row alignItems="center" gap={2}>
                    <Text size="12px" weight={400}>
                        {rating}
                    </Text>
                    <Rating rating={rating} />
                    <Text size={12} weight={400} color="#303234A3">
                        {ratingsCount} {pluralize(ratingsCount, ['оценка', 'оценки', 'оценок'])}
                    </Text>
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
                <Text align="center" weight="500" size="12px" lineHeight={14}>
                    Будьте первым кто оставил отзыв
                </Text>
            )}
            {reviews.length > 0 && (
                <Link href={`/offers/${offer.id}/reviews`}>
                    <Row justifyContent="center">
                        <Button variant="pseudo">
                            <Text weight="500" size="12px" lineHeight={14} decoration="underline">
                                Все отзывы
                            </Text>
                        </Button>
                    </Row>
                </Link>
            )}
        </Block>
    );
}
