'use client';

import {Block} from '@/components/layout/Block';
import {Column} from '@/components/layout/Column';
import {BasketItem} from './item';
import {Text} from '@/components/Text';
import {Row} from '@/components/layout/Row';
import {Separator} from '@/components/Separator';
import {BasketHeader} from './header';
import {Button} from '@/components/Button';
import {useAppDispatch, useAppSelector} from '@/lib/hooks';
import {useEffect} from 'react';
import {basketSelectors, loadBasketItemsAction} from '@/lib/features/basket';
import {Loader} from '@/components/Loader';
import {AuthorizationModal} from '../authorization/authorizationModal';
import {userSelectors} from '@/lib/features/user';
import Link from 'next/link';

export default function Basket() {
    const dispatch = useAppDispatch();
    const isUserAuthorized = useAppSelector(userSelectors.selectIsAuthorized);
    const basketItems = useAppSelector(basketSelectors.selectAll);
    const areBasketItemsLoading = useAppSelector(basketSelectors.selectAreBasketItemsLoading);
    const selectedItemsCost = useAppSelector(basketSelectors.selectSelectedOffersCost);
    const formattedSelectedItemsCost = selectedItemsCost.toFixed(2);

    useEffect(() => {
        dispatch(loadBasketItemsAction());
    }, []);

    const itemsCount = basketItems.length;

    return (
        <Column height="100%" justifyContent="space-between">
            <Column gap="2" flex="1">
                <BasketHeader count={itemsCount} />
                {areBasketItemsLoading && (
                    <Row justifyContent="center">
                        <Loader />
                    </Row>
                )}
                {basketItems.map(({id, capacity, offer}) => (
                    <Block key={id}>
                        <BasketItem id={id} capacity={capacity} count={1} offer={offer} />
                    </Block>
                ))}
                {Boolean(itemsCount) && (
                    <Block gap="4">
                        <Text size={12} weight={600}>
                            Ваш заказ
                        </Text>
                        <Column gap="2">
                            <Row justifyContent="space-between">
                                <Text size={10} weight={400} color="#303234A3">
                                    Товары ({basketItems.length})
                                </Text>
                                <Text size={10} weight={400}>
                                    {selectedItemsCost} ₽
                                </Text>
                            </Row>
                            <Row justifyContent="space-between">
                                <Text size={10} weight={400} color="#303234A3">
                                    Скидка
                                </Text>
                                <Text size={10} weight={600}>
                                    {Number(selectedItemsCost) / 10} ₽
                                </Text>
                            </Row>
                            <Separator />
                            <Row justifyContent="space-between">
                                <Text size={12} weight={400} color="#303234A3">
                                    Итого
                                </Text>
                                <Text size={10} weight={600}>
                                    {formattedSelectedItemsCost} ₽
                                </Text>
                            </Row>
                        </Column>
                    </Block>
                )}
            </Column>

            {selectedItemsCost > 0 && (
                <Row gap="6" padding="8px 16px 8px 16px" background="#fff">
                    <Column justifyContent="center" gap="1">
                        <Text size={14} weight={600} wrap="nowrap">
                            {formattedSelectedItemsCost} ₽
                        </Text>
                        <Text size={10} weight={400} color="#303234A3">
                            1 товар
                        </Text>
                    </Column>

                    {isUserAuthorized ? (
                        <Link href="/basket/checkout">
                            <Button width="full">Оформить</Button>
                        </Link>
                    ) : (
                        <AuthorizationModal />
                    )}
                </Row>
            )}
        </Column>
    );
}
