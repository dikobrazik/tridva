'use client';

import css from './Page.module.scss';
import {Button} from '@/components/Button';
import {Box} from '@/components/layout/Box';
import classNames from 'classnames';
import {useAppDispatch, useAppSelector} from '@/lib/hooks';
import {offersSelectors, toggleFavoriteOfferAction} from '@/lib/features/offers';
import {useDebounce} from '@/hooks/useDebounce';

type Props = {
    id: number;
};

export const LikeButton = (props: Props) => {
    const dispatch = useAppDispatch();
    const isFavoriteOffer = useAppSelector(state => offersSelectors.selectIsOfferFavorite(state, props.id));

    const onToggle = useDebounce(() => {
        dispatch(toggleFavoriteOfferAction({offerId: props.id}));
    }, 500);

    return (
        <Box onClick={onToggle} className={classNames(css.customButton, css.like)}>
            <Button
                className={css.customRadius}
                size="m"
                variant={isFavoriteOffer ? 'action' : 'action-white'}
                icon={isFavoriteOffer ? 'heartWhite' : 'heart'}
                iconSize="m"
            />
        </Box>
    );
};
