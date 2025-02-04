'use client';

import {useEffect, useState} from 'react';
import {useIsDesktopLayoutEnabled} from '../useIsDesktopLayoutEnabled';

const desktopMatchMedia = window.matchMedia('(min-width: 1024px)');

export const useIsDesktop = () => {
    const isDesktopLayoutEnabled = useIsDesktopLayoutEnabled();

    const [isDesktop, setIsDesktop] = useState(isDesktopLayoutEnabled && desktopMatchMedia.matches);

    useEffect(() => {
        const listener = () => {
            setIsDesktop(isDesktopLayoutEnabled && desktopMatchMedia.matches);
        };

        desktopMatchMedia.addEventListener('change', listener);
        listener();

        return () => desktopMatchMedia.removeEventListener('change', listener);
    }, [isDesktopLayoutEnabled]);

    return isDesktop;
};
