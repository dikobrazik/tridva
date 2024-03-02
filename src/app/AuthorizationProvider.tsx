'use client';
import React, {useEffect} from 'react';
import {createAnonymousUser} from '@/api';

export default function AuthorizationProvider({children}: {children: React.ReactNode}) {
    useEffect(() => {
        createAnonymousUser();
    }, []);

    return <>{children}</>;
}
