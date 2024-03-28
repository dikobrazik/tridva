'use client';
import React, {useEffect} from 'react';
import {checkTokenAction} from '@/lib/features/user';
import {useAppDispatch} from '@/lib/hooks';

export default function AuthTokenProvider({children}: {children: React.ReactNode}) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(checkTokenAction());
    }, []);

    return <>{children}</>;
}
