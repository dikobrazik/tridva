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

export default function CheckoutPage() {
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
                <Header withBackArrow>Оформление заказа</Header>

                <Block>
                    <Row>
                        {selectedBasketItemsCount} {pluralize(selectedBasketItemsCount, ['товар', 'товара', 'товаров'])}{' '}
                        товар на сумму
                        <Text size={12} weight={600}>
                            {selectedBasketItemsCost} ₽
                        </Text>
                    </Row>
                </Block>
                <Block gap="4">
                    <Column gap="2">
                        <Text size={12} weight={600}>
                            Укажите адрес доставки
                        </Text>
                        <select disabled defaultValue={3}>
                            <option>Казань</option>
                            <option>Екатеринбург</option>
                            <option value={3}>Самара</option>
                        </select>
                    </Column>
                    <Column gap="2">
                        <Text size={12} weight={600}>
                            <Text color="#4FDE38">Бесплатная</Text> доставка в пункт выдачи, можно забрать 20 февраля
                            (завтра)
                        </Text>

                        <Column gap="1">
                            <Text size={10} weight={400} color="#303234A3">
                                Срок хранения заказа 5 дней
                            </Text>
                            <Text size={10} weight={400} color="#303234A3">
                                Можно проверить и примерить
                            </Text>
                            <Text size={10} weight={400} color="#303234A3">
                                Возврат товара быстро и без проблем
                            </Text>
                        </Column>
                    </Column>

                    <select required>
                        <option value={1}>Первый пункт выдачи</option>
                        <option value={2}>Второй пункт выдачи</option>
                        <option value={3}>Третий пункт выдачи</option>
                    </select>

                    {/* <Button variant="outline" icon="plus">
                        Добавить пункт выдачи
                    </Button> */}
                </Block>

                <Block gap="4">
                    <Text size={12} weight={600}>
                        Получатель заказа
                    </Text>

                    <Column gap="2">
                        <TextField placeholder="Имя*" />
                        <TextField placeholder="Фамилия*" />
                        <TextField placeholder="E-mail" />
                        <TextField placeholder="Номер телефона" />
                        <Text size={10} weight={400} color="#303234A3">
                            Пришлем статус заказа по e-mail и в SMS
                        </Text>
                    </Column>
                </Block>

                <Block gap="4">
                    <Text size={12} weight={600}>
                        Ваш заказ
                    </Text>

                    <Column gap="2">
                        <Row justifyContent="space-between">
                            <Text size={10} weight={400} color="#303234A3">
                                Товары ({selectedBasketItemsCount})
                            </Text>
                            <Text size={10} weight={400}>
                                {selectedBasketItemsCost} ₽
                            </Text>
                        </Row>
                        <Row justifyContent="space-between">
                            <Text size={10} weight={400} color="#303234A3">
                                Скидка
                            </Text>
                            <Text size={10} weight={400}>
                                -800 ₽
                            </Text>
                        </Row>
                        <Separator />
                        <Row justifyContent="space-between">
                            <Text size={12} weight={600}>
                                Итого
                            </Text>
                            <Text size={12} weight={600}>
                                {selectedBasketItemsCost} ₽
                            </Text>
                        </Row>
                    </Column>
                </Block>

                <Box minHeight="40px" />
            </Column>

            <Row background="#fff" padding="8px 16px">
                <Button width="full">Перейти к оплате ({selectedBasketItemsCost} ₽)</Button>
            </Row>
        </Column>
    );
}
