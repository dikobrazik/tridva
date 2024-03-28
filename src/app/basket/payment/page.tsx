'use client';

import {Button} from '@/components/Button';
import {Header} from '@/components/Header';
import {Separator} from '@/components/Separator';
import {Text} from '@/components/Text';
import {TextField} from '@/components/TextField';
import {Block} from '@/components/layout/Block';
import {Box} from '@/components/layout/Box';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import {basketSelectors} from '@/lib/features/basket';
import {useAppSelector} from '@/lib/hooks';
import {pluralize} from '@/shared/utils/pluralize';
import {redirect} from 'next/navigation';
import {useEffect} from 'react';

export default function PaymentPage() {
    const selectedBasketItemsList = useAppSelector(basketSelectors.selectSelectedBasketItemsList);
    const selectedBasketItemsCost = useAppSelector(basketSelectors.selectSelectedOffersCost);
    const selectedBasketItemsCount = selectedBasketItemsList.length;

    // useEffect(() => {
    //     if (Object.values(selectedBasketItemsList).length === 0) {
    //         redirect('/basket');
    //     }
    // }, []);

    return (
        <Column height="100%" justifyContent="space-between">
            <Column height="100%" overflowY="auto" gap="2">
                <Header withBackArrow>Оплата заказа</Header>

                <Block gap="4">
                    <Text size={12} weight={600}>
                        Выберите способ оплаты
                    </Text>

                    <Column gap="3">
                        <input type="radio" />
                        <input type="radio" />
                        <input type="radio" />
                        <input type="radio" />
                    </Column>
                </Block>

                <Block gap="4">
                    <Text size={12} weight={600}>
                        Есть промокод?
                    </Text>
                    <TextField placeholder="Введите промокод"></TextField>
                    <Button variant="normal" size="m">
                        Применить
                    </Button>
                </Block>
            </Column>

            <Row background="#fff" padding="8px 16px">
                <Button width="full">Оплатить {selectedBasketItemsCost} ₽</Button>
            </Row>
        </Column>
    );
}
