'use client';

import {Button} from '@/components/Button';
import {Text} from '@/components/Text';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import {Offer} from '@/types/offers';
import css from './Footer.module.scss';
import {Box} from '@/components/layout/Box';
import classNames from 'classnames';
import {useAppDispatch, useAppSelector} from '@/lib/hooks';
import {
    basketSelectors,
    decreaseBasketItemCountAction,
    increaseBasketItemCountAction,
    putOfferToBasketAction,
} from '@/lib/features/basket';
import {formatPrice} from '@/shared/utils/formatPrice';

export const CreateSingleGroupButton = ({offer}: {offer: Offer}) => {
    const dispatch = useAppDispatch();
    const onCreateSingleGroupClick = () => {
        dispatch(putOfferToBasketAction({offerId: offer.id}));
    };

    const formattedPrice = formatPrice(offer.price);

    return (
        <Button width="full" variant="normal" size="m" onClick={onCreateSingleGroupClick}>
            <Column>
                <Text size={12} weight={600} lineHeight={14}>
                    Купить в розницу
                </Text>
                <Text size={12} weight={600} lineHeight={14}>
                    {formattedPrice} ₽
                </Text>
            </Column>
        </Button>
    );
};

export const SingleGroupButton = ({offer}: {offer: Offer}) => {
    const dispatch = useAppDispatch();
    const basketItem = useAppSelector(state => basketSelectors.selectBasketItemByOfferId(state, offer.id));

    if (basketItem === undefined) return null;

    const onMinusClick = () => {
        dispatch(decreaseBasketItemCountAction({id: basketItem.id}));
    };

    const onPlusClick = () => {
        dispatch(increaseBasketItemCountAction({id: basketItem.id}));
    };

    return (
        <Row flex="1" className={css.singleGroupButton} justifyContent="space-between" padding="8px" borderRadius="2">
            <Button
                className={classNames(css.singleGroupButtons, css.padding)}
                variant="pseudo"
                size="m"
                icon="minus"
                onClick={onMinusClick}
            />
            <Column gap="1">
                <Text lineHeight={14} size={12} weight={600} align="center">
                    {basketItem.count}
                </Text>
                <Text color="#303234A3" size={8} weight={400}>
                    В корзине
                </Text>
            </Column>
            <Button
                className={classNames(css.singleGroupButtons, css.padding)}
                variant="pseudo"
                size="m"
                icon="plus"
                onClick={onPlusClick}
            />
        </Row>
    );
};

export const AddSignleItemButton = ({offer}: {offer: Offer}) => {
    const basketItem = useAppSelector(state => basketSelectors.selectBasketItemByOfferId(state, offer.id));

    if (basketItem?.group) {
        return null;
    }

    return (
        <Box flex="1 1 50%">
            {basketItem && basketItem.count > 0 ? (
                <SingleGroupButton offer={offer} />
            ) : (
                <CreateSingleGroupButton offer={offer} />
            )}
        </Box>
    );
};
