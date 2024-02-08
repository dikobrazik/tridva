'use client';

import {Loader} from '@/components/Loader';
import {OfferCard} from '@/components/OfferCard';
import {Box} from '@/components/layout/Box';
import {useOffers} from '../useOffers';
import {OffersListContext} from './context';
import {PropsWithChildren, useContext, useEffect} from 'react';
import {Column} from '@/components/layout/Column';
import {offersSelectors} from '@/lib/features/offers';
import {useAppSelector} from '@/lib/hooks';

type Props = {
    categoryId?: number;
};

export function OffersList(props: Props) {
    const {setOnScroll} = useContext(OffersListContext);
    const {offers, onScroll} = useOffers(props);

    useEffect(() => {
        setOnScroll(onScroll);
    }, []);

    return offers.map((offer, index) => <OfferCard key={index} {...offer} />);
}

export function OffersListContainer({children}: PropsWithChildren<{}>) {
    const {onScroll} = useContext(OffersListContext);

    return (
        <Column onScroll={onScroll} overflowY="scroll" height="100%">
            {children}
        </Column>
    );
}

export function OffersListLoader() {
    const areOffersLoading = useAppSelector(offersSelectors.selectIsLoading);

    if (areOffersLoading) {
        <Box display="flex" justifyContent="center">
            <Loader />
        </Box>;
    }

    return null;
}
