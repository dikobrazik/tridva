'use client';

import {Offer} from '@/types/offers';
import {NewReviewDrawer} from './NewReviewDrawer';
import {Button} from '@/components/Button';

type Props = {
    offer: Offer;
};

export const NewReviewButton = ({offer}: Props) => {
    return (
        <NewReviewDrawer
            offer={offer}
            Toggler={({onClick}) => (
                <Button size="m" variant="outline" onClick={onClick}>
                    Написать отзыв
                </Button>
            )}
        />
    );
};
