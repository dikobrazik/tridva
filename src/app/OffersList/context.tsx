'use client';

import React, {UIEventHandler, useState} from 'react';

type OnScrollCallback = UIEventHandler<HTMLDivElement>;

type OffersListContextValue = {
    areOffersLoading?: boolean;
    onScroll?: OnScrollCallback;

    // eslint-disable-next-line no-unused-vars
    setOnScroll: (onScroll: OnScrollCallback) => void;
};

export const OffersListContext = React.createContext<OffersListContextValue>({setOnScroll: () => {}});

export function OffersListContextConsumer({children}: Parameters<typeof OffersListContext.Consumer>[0]) {
    return <OffersListContext.Consumer>{value => children(value)}</OffersListContext.Consumer>;
}

export function OffersListContextProvider({children}: {children: React.ReactNode}) {
    const [onScroll, setOnScroll] = useState<OnScrollCallback>(() => () => {});

    return (
        <OffersListContext.Provider value={{onScroll, setOnScroll: func => setOnScroll(() => func)}}>
            {children}
        </OffersListContext.Provider>
    );
}
