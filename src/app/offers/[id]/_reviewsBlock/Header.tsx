'use client';

import {Row} from '@/components/layout/Row';
import {Text} from '@/components/Text';
import {NewReviewDrawer} from '../reviews/NewReviewDrawer';
import {Button} from '@/components/Button';
import {Offer} from '@/types/offers';

export const ReviewsBlockHeader = ({offer, reviewsCount}: {offer: Offer; reviewsCount: number}) => {
    return (
        <Row alignItems="center" justifyContent="space-between">
            <Text weight="600" size="16px" height={20}>
                Отзывы{' '}
                <Text weight="600" size="16px" height={20} color="#3032347A">
                    {reviewsCount}
                </Text>
            </Text>
            <NewReviewDrawer
                offer={offer}
                Toggler={({onClick}) => (
                    <Button paddingX={2} icon="pen" variant="pseudo" onClick={onClick}>
                        <Text size={12} weight={500}>
                            Написать отзыв
                        </Text>
                    </Button>
                )}
            />
        </Row>
    );
};
