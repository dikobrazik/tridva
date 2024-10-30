'use client';

import {Button} from '@/components/Button';
import {Text} from '@/components/Text';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import {CreateGroupDrawer} from './CreateGroupDrawer';
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

const CreateSingleGroupButton = ({offer}: {offer: Offer}) => {
    const dispatch = useAppDispatch();
    const onCreateSingleGroupClick = () => {
        dispatch(putOfferToBasketAction({offerId: offer.id}));
    };

    const formattedPrice = formatPrice(offer.price);

    return (
        <Button variant="normal" size="m" flex="1" onClick={onCreateSingleGroupClick}>
            <Column>
                <Text size={12} weight={600} height={14}>
                    Купить в розницу
                </Text>
                <Text size={12} weight={600} height={14}>
                    {formattedPrice} ₽
                </Text>
            </Column>
        </Button>
    );
};

const SingleGroupButton = ({offer}: {offer: Offer}) => {
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
        <Row className={css.singleGroupButton} justifyContent="space-between" padding="8px" borderRadius="2">
            <Button
                className={classNames(css.singleGroupButtons, css.padding)}
                variant="pseudo"
                size="m"
                icon="minus"
                onClick={onMinusClick}
            />
            <Column gap="1">
                <Text size={12} weight={600} align="center">
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

export default function Footer({offer}: {offer: Offer}) {
    const inBasketCount = useAppSelector(state => basketSelectors.selectBasketItemCountByOfferId(state, offer.id));

    return (
        <Column className={css.container} background="#fff" padding="8px 16px" gap="2">
            <Row>
                <Button flex="1" variant="outline" size="m">
                    <Row flex="1" justifyContent="space-between">
                        <Column>
                            <Text align="start" size={10} weight={600} height={10} color="#303234">
                                Присоединиться к группе с Владимиром М.
                            </Text>
                            <Text align="start" size={8} weight={400} height={12} color="#303234A3">
                                Нужен еще 1 человек для покупки, до конца сбора:{' '}
                                <Text size={8} weight={600} height={12}>
                                    23:20:59
                                </Text>
                            </Text>
                        </Column>

                        <Button as="a" size="s" icon="chevronRightWhite" iconSize="xs" />
                    </Row>
                </Button>
            </Row>
            <Row gap="2" justifyContent="center">
                {inBasketCount > 0 ? (
                    <Box flex="1">
                        <SingleGroupButton offer={offer} />
                    </Box>
                ) : (
                    <CreateSingleGroupButton offer={offer} />
                )}
                <CreateGroupDrawer offer={offer} />
            </Row>
        </Column>
    );
}
