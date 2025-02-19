'use client';

import {PropsWithChildren} from 'react';
import css from './Container.module.scss';
import {Column} from '@/components/layout/Column';
import {useIsDesktopLayoutEnabled} from '@/hooks/useIsDesktopLayoutEnabled';
import {Box} from '@/components/layout/Box';
import {Block} from '@/components/layout/Block';

export const Container = (props: PropsWithChildren) => {
    const isDesktopLayoutEnabled = useIsDesktopLayoutEnabled();

    return <Column className={isDesktopLayoutEnabled ? css.container : css.oldContainer}>{props.children}</Column>;
};

export const Content = (props: PropsWithChildren) => {
    const isDesktopLayoutEnabled = useIsDesktopLayoutEnabled();

    if (isDesktopLayoutEnabled) {
        return (
            <Box id="content" className={css.contentContainer}>
                <Block roundAll className={css.content}>
                    {props.children}
                </Block>
            </Box>
        );
    }

    return <Box id="content">{props.children}</Box>;
};
