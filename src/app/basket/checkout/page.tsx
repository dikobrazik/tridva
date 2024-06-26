'use client';

import {Button} from '@/components/Button';
import {Header} from '@/components/Header';
import {Select} from '@/components/Select';
import {Separator} from '@/components/Separator';
import {Text} from '@/components/Text';
import {TextField} from '@/components/TextField';
import {Block} from '@/components/layout/Block';
import {Box} from '@/components/layout/Box';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import {basketSelectors, loadBasketItemsAction} from '@/lib/features/basket';
import {checkoutSelectors, processOrderAction} from '@/lib/features/checkout';
import {userSelectors} from '@/lib/features/user';
import {useAppDispatch, useAppSelector} from '@/lib/hooks';
import {pluralize} from '@/shared/utils/pluralize';
import {format} from 'date-fns';
import Link from 'next/link';
import {redirect} from 'next/navigation';
import {FormEventHandler, useEffect} from 'react';

export default function CheckoutPage() {
    const dispatch = useAppDispatch();
    const selectedPickupPoint = useAppSelector(checkoutSelectors.selectSelectedPickupPoint);

    const phone = useAppSelector(userSelectors.selectPhone);
    const profile = useAppSelector(userSelectors.selectProfile);
    const selectedBasketItemsList = useAppSelector(basketSelectors.selectSelectedBasketItemsList);
    const selectedBasketItemsCost = useAppSelector(basketSelectors.selectSelectedOffersCost);
    const selectedBasketItemsCount = selectedBasketItemsList.length;

    useEffect(() => {
        dispatch(loadBasketItemsAction());

        if (Object.values(selectedBasketItemsList).length === 0) {
            redirect('/basket');
        }
    }, []);

    const onCheckoutClick: FormEventHandler<HTMLFormElement> = e => {
        e.preventDefault();

        dispatch(processOrderAction());
    };

    return (
        <Column as="form" onSubmit={onCheckoutClick} height="100%" justifyContent="space-between">
            <Column height="100%" overflowY="auto" gap="2">
                <Header withBackArrow>Оформление заказа</Header>

                <Block>
                    <Row display="inline">
                        <Text>
                            {`${selectedBasketItemsCount} ${pluralize(selectedBasketItemsCount, [
                                'товар',
                                'товара',
                                'товаров',
                            ])} на сумму `}
                        </Text>
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
                        <Select disabled value={0} options={[{id: 0, name: 'Самара'}]} />
                    </Column>
                    <Column gap="2">
                        <Text size={12} weight={600}>
                            <Text color="#4FDE38">Бесплатная</Text> доставка в пункт выдачи, можно забрать{' '}
                            {format(new Date(), 'do MMMM ')}
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

                    {selectedPickupPoint && (
                        <Column gap={1}>
                            <Text weight={400} size={12}>
                                Пункт выдачи г. Самара, {selectedPickupPoint.address}
                            </Text>
                            <Text weight={400} size={10} color="#303234A3">
                                Хранение 5 дней, ежедневно с 10:00 до 21-00
                            </Text>
                        </Column>
                    )}

                    <Link href="/basket/checkout/pickup-points">
                        <Button variant="outline" size="m" width="full">
                            {selectedPickupPoint ? 'Изменить' : 'Выбрать'} пункт выдачи
                        </Button>
                    </Link>
                </Block>

                <Block gap="4">
                    <Text size={12} weight={600}>
                        Получатель заказа
                    </Text>

                    <Column gap="2">
                        <TextField disabled placeholder="Имя*" name="name" value={profile?.name ?? ''} />
                        <TextField
                            disabled
                            placeholder="E-mail"
                            type="email"
                            name="email"
                            value={profile?.email ?? ''}
                        />
                        <TextField disabled placeholder="Номер телефона" name="phone" value={phone} />
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
                <Button disabled={selectedPickupPoint === undefined} width="full" type="submit">
                    Перейти к оплате ({selectedBasketItemsCost} ₽)
                </Button>
            </Row>
        </Column>
    );
}
