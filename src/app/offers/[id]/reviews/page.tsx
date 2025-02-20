import {Rating} from '@/components/Rating';
import {Text} from '@/components/Text';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import {Review} from '@/types/review';
import css from './Reviews.module.scss';
import {format} from 'date-fns';
import {loadHasReview, loadOffer, loadReviews} from '@/api';
import {Profile} from '@/components/Profile';
import {omitCurrentYear} from '@/shared/date/omitCurrentYear';
import {NewReviewButton} from './NewReviewButton';
import {pluralize} from '@/shared/utils/pluralize';
import {PageParams} from '@/shared/types/next';
import {Header} from '@/components/Header';

const ReviewItem = (review: Review) => {
    return (
        <Column className={css.reviewItem} gap="2" paddingY="3" paddingX="4">
            <Row justifyContent="space-between" alignItems="center">
                <Profile name={review.authorName} />

                <Text size={12} weight={400} color="#303234A3">
                    {omitCurrentYear(format(new Date(review.createdAt), 'dd MMMM yyyy'))}
                </Text>
            </Row>
            <Row gap="2">
                <Text size={12} weight={400}>
                    {review.rating}
                </Text>
                <Rating rating={review.rating} />
            </Row>
            <Text weight={400} size={12} overflowWrap="break-word">
                {review.text}
            </Text>
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
            <Column>
                <Header withBackArrow backRoute={`/offers/${offerId}`}>
                    Отзывы{' '}
                    <Text weight="600" size="16px" lineHeight={20} color="#3032347A">
                        {reviewsCount}
                    </Text>
                </Header>
                <Column className={css.topContent} gap="3">
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
            </Column>

            <Column gap="2" overflowY="scroll">
                {reviews.map(review => (
                    <ReviewItem key={review.id} {...review} />
                ))}
            </Column>
        </Column>
    );
}
