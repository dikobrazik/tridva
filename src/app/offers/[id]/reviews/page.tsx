import {Button} from '@/components/Button';
import {Rating} from '@/components/Rating';
import {Text} from '@/components/Text';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import {Review} from '@/types/review';
import css from './Reviews.module.scss';
import {format} from 'date-fns';
import {loadHasReview, loadOffer, loadReviews} from '@/api';
import Link from 'next/link';
import {Profile} from '@/components/Profile';
import {omitCurrentYear} from '@/shared/date/omitCurrentYear';
import {NewReviewButton} from './NewReviewButton';
import {pluralize} from '@/shared/utils/pluralize';
import {PageParams} from '@/shared/types/next';

const ReviewItem = (review: Review) => {
    return (
        <Column className={css.reviewItem} gap="2" paddingY="3" paddingX="4">
            <Row justifyContent="space-between">
                <Profile name={review.authorName} />

                <Text size="10px" weight={400} color="#303234A3">
                    {omitCurrentYear(format(new Date(review.createdAt), 'dd MMMM yyyy'))}
                </Text>
            </Row>
            <Row gap="2">
                <Text size="12px" weight={400}>
                    {review.rating}
                </Text>
                <Rating rating={review.rating} />
            </Row>
            {review.text}
        </Column>
    );
};

type Props = PageParams<unknown, {id: string}>;

export default async function Reviews(props: Props) {
    const offerId = Number(props.params.id);
    const [offer, reviews, hasReview] = await Promise.all([
        loadOffer({id: offerId}),
        loadReviews({offerId}),
        loadHasReview({offerId}),
    ]);

    const {reviewsCount, ratingsCount, rating = 0} = offer;

    return (
        <Column className={css.container} height="100%" gap={2}>
            <Column className={css.topContent} gap="3">
                <Row className={css.header} paddingTop="16px" justifyContent="space-between" alignItems="center">
                    <Link href={`/offers/${offerId}`}>
                        <Button variant="pseudo" icon="chevronLeft" iconSize="m" />
                    </Link>

                    <Text weight="600" size="16px" height={20}>
                        Отзывы{' '}
                        <Text weight="600" size="16px" height={20} color="#3032347A">
                            {reviewsCount}
                        </Text>
                    </Text>

                    <span />
                </Row>

                <Row alignItems="center" gap={2}>
                    <Text size="12px" weight={400}>
                        {rating}
                    </Text>
                    <Rating rating={rating} />
                    <Text size={10} weight={400} color="#303234A3">
                        {ratingsCount} {pluralize(ratingsCount, ['оценка', 'оценки', 'оценок'])}
                    </Text>
                </Row>

                {!hasReview && <NewReviewButton offer={offer} />}
            </Column>

            <Column gap="2" overflowY="scroll">
                {reviews.map(review => (
                    <ReviewItem key={review.id} {...review} />
                ))}
            </Column>
        </Column>
    );
}
