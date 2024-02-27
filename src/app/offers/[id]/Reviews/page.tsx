import {Button} from '@/components/Button';
import {Rating} from '@/components/Rating';
import {Text} from '@/components/Text';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import {Review} from '@/types/review';
import Image from 'next/image';
import css from './Reviews.module.scss';
import {format} from 'date-fns';
import {loadOffer, loadReviews} from '@/api';
import {NewReviewDrawer} from './NewReviewDrawer';
import Link from 'next/link';

const ReviewItem = (review: Review) => {
    return (
        <Column className={css.reviewItem} gap="2" paddingY="3" paddingX="4">
            <Row justifyContent="space-between">
                <Row gap="2">
                    <Image
                        src="https://cdn-icons-png.flaticon.com/128/4128/4128176.png"
                        width="24"
                        height="24"
                        alt="avatar"
                    />
                    {review.authorName}
                </Row>

                <Text size="10px" weight={400} color="#303234A3">
                    {format(new Date(review.createdAt), 'PPP')}
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

type Props = {
    params: {id: string};
    searchParams: unknown;
};

export default async function Reviews(props: Props) {
    const offerId = Number(props.params.id);
    const offer = await loadOffer({id: offerId});
    const reviews = await loadReviews({offerId: Number(props.params.id)});

    return (
        <Column className={css.container} height="100%" gap={2}>
            <Column className={css.topContent} gap="2">
                <Row className={css.header} paddingTop="16px" justifyContent="space-between" alignItems="center">
                    <Link href={`/offers/${offerId}`}>
                        <Button variant="pseudo" icon="chevronLeft" iconSize="m" />
                    </Link>

                    <Text weight="600" size="16px" height={20}>
                        Отзывы{' '}
                        <Text weight="600" size="16px" height={20} color="#3032347A">
                            {offer.reviewsCount}
                        </Text>
                    </Text>

                    <span />
                </Row>

                <Row alignItems="center" gap={2}>
                    <Text size="12px" weight={400}>
                        {offer.rating}
                    </Text>
                    <Rating rating={offer.rating ?? 0} />
                </Row>

                <NewReviewDrawer />

                <Row>
                    <Button variant="pseudo" icon="switch">
                        По дате
                    </Button>
                </Row>
            </Column>

            <Column gap="2" overflowY="scroll">
                {reviews.map(review => (
                    <ReviewItem key={review.id} {...review} />
                ))}
            </Column>
        </Column>
    );
}
