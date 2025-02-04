'use client';

import {useEffect, useState} from 'react';
import {useIsDesktopLayoutEnabled} from '../useIsDesktopLayoutEnabled';

const getDesktopMatchMedia = () => window.matchMedia('(min-width: 1024px)');

export const useIsDesktop = () => {
    const isDesktopLayoutEnabled = useIsDesktopLayoutEnabled();

    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const listener = () => {
            setIsDesktop(isDesktopLayoutEnabled && getDesktopMatchMedia().matches);
        };

        getDesktopMatchMedia().addEventListener('change', listener);
        listener();

        return () => getDesktopMatchMedia().removeEventListener('change', listener);
    }, [isDesktopLayoutEnabled]);

    return isDesktop;
};
