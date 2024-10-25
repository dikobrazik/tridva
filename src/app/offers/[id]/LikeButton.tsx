'use client';

import css from './Page.module.scss';
import {Button} from '@/components/Button';
import {Box} from '@/components/layout/Box';
import classNames from 'classnames';

export const LikeButton = () => {
    return (
        <Box className={classNames(css.customButton, css.like)}>
            <Button className={css.customRadius} size="m" variant="action-white" icon="heart" iconSize="m" />
        </Box>
    );
};
