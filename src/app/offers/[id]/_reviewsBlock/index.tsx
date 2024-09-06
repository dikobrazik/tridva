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
    offerId: number;
    reviewsCount: number;
    rating?: number;
};

export default async function Reviews({offerId, reviewsCount, rating = 0}: Props) {
    const reviews = await loadReviews({offerId});

    return (
        <Column gap={3}>
            <Row alignItems="center" justifyContent="space-between">
                <Text weight="600" size="16px" height={20}>
                    Отзывы{' '}
                    <Text weight="600" size="16px" height={20} color="#3032347A">
                        {reviewsCount}
                    </Text>
                </Text>
            </Row>
            <Row alignItems="center" gap={2}>
                <Text size="12px" weight={400}>
                    {rating}
                </Text>
                <Rating rating={rating} />
            </Row>
            <Row className={css.reviewsList} gap={2}>
                {reviews.slice(0, 3).map(review => (
                    <ReviewsItem key={review.id} {...review} />
                ))}
            </Row>
            <Link href={`/offers/${offerId}/reviews`}>
                <Row justifyContent="center">
                    <Button variant="pseudo">
                        <Text weight="500" size="12px" height={14} decoration="underline">
                            Все отзывы
                        </Text>
                    </Button>
                </Row>
            </Link>
        </Column>
    );
}
