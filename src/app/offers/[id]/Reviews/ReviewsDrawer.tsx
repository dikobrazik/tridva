'use client';

import {Button} from '@/components/Button';
import {Drawer} from '@/components/Drawer';
import {Rating} from '@/components/Rating';
import {Text} from '@/components/Text';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import {useToggler} from '@/hooks/useToggler';
import {loadReviewsAction, reviewsSelectors} from '@/lib/features/reviews';
import {useAppDispatch, useAppSelector} from '@/lib/hooks';
import {Review} from '@/types/review';
import {useEffect} from 'react';

type Props = {
    offerId: number;
    reviewsCount: number;
    rating: number;
};

const ReviewItem = (review: Review) => {
    return review.text;
};

export const ReviewsDrawer = ({offerId, reviewsCount, rating}: Props) => {
    const {isActive, toggle} = useToggler();

    const dispatch = useAppDispatch();
    const reviews = useAppSelector(state => reviewsSelectors.selectOfferReviews(state, offerId));

    useEffect(() => {
        dispatch(loadReviewsAction({offerId}));
    }, []);

    return (
        <>
            <Button onClick={toggle} variant="pseudo">
                <Text weight="500" size="12px" height={14} decoration="underline">
                    Все отзывы
                </Text>
            </Button>
            <Drawer
                header={
                    <Row paddingY="4" justifyContent="space-between" alignItems="center">
                        <Button variant="pseudo" icon="chevronLeft" iconSize="m" />

                        <Text weight="600" size="16px" height={20}>
                            Отзывы{' '}
                            <Text weight="600" size="16px" height={20} color="#3032347A">
                                {reviewsCount}
                            </Text>
                        </Text>

                        <span />
                    </Row>
                }
                fullHeight
                withClose
                isOpen={isActive}
                onClose={toggle}
            >
                <Column gap={4}>
                    <Row alignItems="center" gap={2}>
                        <Text size="12px" weight={400}>
                            {rating}
                        </Text>
                        <Rating rating={rating} />
                    </Row>

                    <Row>
                        <Button variant="pseudo" icon="switch">
                            По дате
                        </Button>
                    </Row>

                    {reviews.map(review => (
                        <ReviewItem key={review.id} {...review} />
                    ))}
                </Column>
            </Drawer>
        </>
    );
};
