'use client';
import React, {useEffect, useRef, useState} from 'react';
import {loadUserAction} from '@/lib/features/user';
import {useAppDispatch} from '@/lib/hooks';

import {ru} from 'date-fns/locale';
import {setDefaultOptions} from 'date-fns';
import {loadBasketItemsAction} from '@/lib/features/basket';
import {useSaveAppRouter} from '@/shared/router';
import {loadFavoriteOffersAction} from '@/lib/features/offers';
import {Loader} from '@/components/Loader';
import {Box} from '@/components/layout/Box';
import {usePathname} from 'next/navigation';

const PAGES_WITH_TOKEN_CHECK = ['/basket/checkout'];

export default function AuthTokenProvider({children}: {children: React.ReactNode}) {
    const isRendered = useRef(false);
    const pathname = usePathname();

    const [isUserLoaded, setIsUserLoaded] = useState(false);

    const dispatch = useAppDispatch();
    useSaveAppRouter();

    useEffect(() => {
        if (!isRendered.current) {
            // надо бы перенести, чтобы не смешивать авторизацию и локали date fns
            setDefaultOptions({locale: ru});
            dispatch(loadBasketItemsAction());
            dispatch(loadFavoriteOffersAction());
            dispatch(loadUserAction())
                .unwrap()
                .then(() => {})
                .finally(() => {
                    setIsUserLoaded(true);
                });
        }

        isRendered.current = true;
    }, []);

    if (PAGES_WITH_TOKEN_CHECK.includes(pathname) && !isUserLoaded) {
        return (
            <Box height="100vh" justifyContent="center" alignItems="center">
                <Loader />
            </Box>
        );
    }

    return <>{children}</>;
}
