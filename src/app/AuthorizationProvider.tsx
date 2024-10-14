'use client';
import React, {useEffect} from 'react';
import {checkTokenAction} from '@/lib/features/user';
import {useAppDispatch} from '@/lib/hooks';

import {ru} from 'date-fns/locale';
import {setDefaultOptions} from 'date-fns';
import {loadBasketItemsAction} from '@/lib/features/basket';
import {useSaveAppRouter} from '@/shared/router';

export default function AuthTokenProvider({children}: {children: React.ReactNode}) {
    const dispatch = useAppDispatch();
    useSaveAppRouter();

    useEffect(() => {
        // надо бы перенести, чтобы не смешивать авторизацию и локали date fns
        setDefaultOptions({locale: ru});
        dispatch(checkTokenAction());
        dispatch(loadBasketItemsAction());
    }, []);

    return <>{children}</>;
}
