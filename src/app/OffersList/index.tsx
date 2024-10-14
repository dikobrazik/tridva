'use client';

import {Loader} from '@/components/Loader';
import {OfferCard} from '@/components/OfferCard';
import {Box} from '@/components/layout/Box';
import {useOffers} from '../useOffers';
import {useAppSelector} from '@/lib/hooks';
import {offersSelectors} from '@/lib/features/offers';

type Props = {
    categoryId?: number;
    name?: string;
};

export function OffersList(props: Props) {
    const {offers} = useOffers(props);

    return offers.map(offer => <OfferCard key={`${offer.id}`} {...offer} />);
}

// показываем перманентно, пока не дошли до последней страницы
export function OffersListLoader() {
    const isLastPageReached = useAppSelector(offersSelectors.selectIsLastPageReached);

    if (isLastPageReached) return null;

    return (
        <Box paddingY={3} display="flex" justifyContent="center">
            <Loader />
        </Box>
    );
}
