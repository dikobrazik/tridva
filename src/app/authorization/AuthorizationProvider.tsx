'use client';
import React, {useEffect, useRef} from 'react';
import {checkTokenAction} from '@/lib/features/user';
import {useAppDispatch} from '@/lib/hooks';

import {ru} from 'date-fns/locale';
import {setDefaultOptions} from 'date-fns';
import {loadBasketItemsAction} from '@/lib/features/basket';
import {useSaveAppRouter} from '@/shared/router';
import {loadFavoriteOffersAction} from '@/lib/features/offers';

export default function AuthTokenProvider({children}: {children: React.ReactNode}) {
    const isRendered = useRef(false);

    const dispatch = useAppDispatch();
    useSaveAppRouter();

    useEffect(() => {
        if (!isRendered.current) {
            // надо бы перенести, чтобы не смешивать авторизацию и локали date fns
            setDefaultOptions({locale: ru});
            dispatch(checkTokenAction()).then(() => {
                dispatch(loadBasketItemsAction());
                dispatch(loadFavoriteOffersAction());
            });
        }

        isRendered.current = true;
    }, []);

    return <>{children}</>;
}
