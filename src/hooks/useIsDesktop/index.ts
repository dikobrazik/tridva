'use client';

import {useEffect, useState} from 'react';
import {useIsDesktopLayoutEnabled} from '../useIsDesktopLayoutEnabled';

const getDesktopMatchMedia = () =>
    typeof window !== 'undefined'
        ? window.matchMedia('(min-width: 1024px)')
        : {matches: false, addEventListener: () => {}, removeEventListener: () => {}};

export const useIsDesktop = () => {
    const isDesktopLayoutEnabled = useIsDesktopLayoutEnabled();

    const [isDesktop, setIsDesktop] = useState(getDesktopMatchMedia().matches);

    useEffect(() => {
        const listener = () => {
            setIsDesktop(isDesktopLayoutEnabled && getDesktopMatchMedia().matches);
        };

        listener();
        getDesktopMatchMedia().addEventListener('change', listener);

        return () => getDesktopMatchMedia().removeEventListener('change', listener);
    }, [isDesktopLayoutEnabled]);

    return isDesktop;
};
