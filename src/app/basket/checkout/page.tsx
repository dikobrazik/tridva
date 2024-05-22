'use client';

import {processOrder} from '@/api';
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
import {userSelectors} from '@/lib/features/user';
import {useAppSelector} from '@/lib/hooks';
import {pluralize} from '@/shared/utils/pluralize';
import {redirect} from 'next/navigation';
import {FormEventHandler, useEffect} from 'react';

export default function CheckoutPage() {
    const phone = useAppSelector(userSelectors.selectPhone);
    const profile = useAppSelector(userSelectors.selectProfile);
    const selectedBasketItemsList = useAppSelector(basketSelectors.selectSelectedBasketItemsList);
    const selectedBasketItemsCost = useAppSelector(basketSelectors.selectSelectedOffersCost);
    const selectedBasketItemsCount = selectedBasketItemsList.length;

    useEffect(() => {
        if (Object.values(selectedBasketItemsList).length === 0) {
            redirect('/basket');
        }
    }, []);

    const onCheckoutClick: FormEventHandler<HTMLFormElement> = e => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);

        formData.forEach(console.log);

        processOrder({
            userInfo: {
                name: formData.get('name') ?? '',
                email: formData.get('email') ?? '',
                phone: formData.get('phone') ?? '',
            },
            pickupPointId: Number(formData.get('pickupPointId')) ?? -1,
            basketItemsIds: selectedBasketItemsList.map(item => item.id),
        });
    };

    return (
        <Column as="form" onSubmit={onCheckoutClick} height="100%" justifyContent="space-between">
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
                        <select name="city" defaultValue={3}>
                            <option value={1}>Казань</option>
                            <option value={2}>Екатеринбург</option>
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

                    <select name="pickupPointId" required>
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
                        <TextField placeholder="Имя*" name="name" value={profile?.name} />
                        {/* <TextField placeholder="Фамилия*" value={} /> */}
                        <TextField placeholder="E-mail" type="email" name="email" value={profile?.email} />
                        <TextField placeholder="Номер телефона" name="phone" value={phone} />
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
                                -{selectedBasketItemsCost / 10} ₽
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
                <Button width="full" type="submit">
                    Перейти к оплате ({selectedBasketItemsCost} ₽)
                </Button>
            </Row>
        </Column>
    );
}
