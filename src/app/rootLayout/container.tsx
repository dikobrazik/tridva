'use client';

import {PropsWithChildren} from 'react';
import css from './Container.module.scss';
import {Column} from '@/components/layout/Column';
import {useIsDesktopLayoutEnabled} from '@/hooks/useIsDesktopLayoutEnabled';

export const Container = (props: PropsWithChildren) => {
    const isDesktopLayoutEnabled = useIsDesktopLayoutEnabled();

    return <Column className={isDesktopLayoutEnabled ? css.container : css.oldContainer}>{props.children}</Column>;
};
