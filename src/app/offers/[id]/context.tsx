'use client';

import {Offer} from '@/types/offers';
import {createContext, PropsWithChildren, useContext} from 'react';

type OfferContextValue = {offer: Offer | null};

export const OfferContext = createContext<OfferContextValue>({offer: null});

export const OfferContextProvider = (props: PropsWithChildren<{offer: Offer}>) => {
    return <OfferContext.Provider value={{offer: props.offer}}>{props.children}</OfferContext.Provider>;
};

export const useOffer = () => {
    const {offer} = useContext(OfferContext);

    if (!offer) throw new Error('[useOffer]: no offer in context');

    return offer;
};
