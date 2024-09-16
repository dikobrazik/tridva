'use client';

import {Loader} from '@/components/Loader';
import {OfferCard} from '@/components/OfferCard';
import {Box} from '@/components/layout/Box';
import {useOffers} from '../useOffers';
import {OffersListContext} from './context';
import {PropsWithChildren, useContext, useEffect} from 'react';
import {Column} from '@/components/layout/Column';
import {useAppSelector} from '@/lib/hooks';
import {offersSelectors} from '@/lib/features/offers';

type Props = {
    categoryId?: number;
    name?: string;
};

export function OffersList(props: Props) {
    const {setOnScroll} = useContext(OffersListContext);
    const {offers, onScroll} = useOffers(props);

    useEffect(() => {
        setOnScroll(onScroll);
    }, [onScroll]);

    return offers.map((offer, index) => <OfferCard key={index} {...offer} />);
}

export function OffersListContainer({
    children,
    ...columnProps
}: PropsWithChildren<{className?: string; paddingY?: number; paddingX?: number; gap?: `${number}`}>) {
    const {onScroll} = useContext(OffersListContext);

    return (
        <Column onScroll={onScroll} overflowY="scroll" height="100%" {...columnProps}>
            {children}
        </Column>
    );
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
