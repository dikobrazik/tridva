'use client';

import css from './Buttons.module.scss';
import {Button} from '@/components/Button';
import {useRouter} from 'next/navigation';
import {Box} from '@/components/layout/Box';
import classNames from 'classnames';

export const BackButton = () => {
    const router = useRouter();

    return (
        <Box onClick={() => router.back()} className={classNames(css.customButton, css.back)}>
            <Button className={css.customRadius} size="m" variant="action-white" icon="chevronLeft" iconSize="m" />
        </Box>
    );
};
