'use client';

import {Button} from '@/components/Button';
import {Header} from '@/components/Header';
import {Select} from '@/components/Select';
import {Text} from '@/components/Text';
import {TextField} from '@/components/TextField';
import {Block} from '@/components/layout/Block';
import {Box} from '@/components/layout/Box';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import {basketSelectors} from '@/lib/features/basket';
import {checkoutSelectors, loadLastSelectedPickupPointAction, processOrderAction} from '@/lib/features/checkout';
import {userSelectors} from '@/lib/features/user';
import {useAppDispatch, useAppSelector} from '@/lib/hooks';
import {pluralize} from '@/shared/utils/pluralize';
import {format} from 'date-fns';
import Link from 'next/link';
import {redirect} from 'next/navigation';
import {FormEventHandler, useEffect} from 'react';
import {Summary} from '../component/Summary';
import {useRouter} from 'next/navigation';
import css from './Page.module.scss';

export default function CheckoutPage() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const selectedPickupPoint = useAppSelector(checkoutSelectors.selectSelectedPickupPoint);

    const isUserAnonymous = useAppSelector(userSelectors.selectIsAnonymous);
    const phone = useAppSelector(userSelectors.selectPhone);
    const profile = useAppSelector(userSelectors.selectProfile);
    const areBasketItemsLoading = useAppSelector(basketSelectors.selectAreBasketItemsLoading);
    const selectedBasketItems = useAppSelector(basketSelectors.selectSelectedBasketItems);
    const selectedBasketItemsCost = useAppSelector(basketSelectors.selectSelectedOffersCost);
    const selectedBasketItemsCount = selectedBasketItems.length;

    useEffect(() => {
        dispatch(loadLastSelectedPickupPointAction());
        if ((!areBasketItemsLoading && selectedBasketItems.length === 0) || isUserAnonymous) {
            redirect('/basket');
        }
    }, [areBasketItemsLoading]);

    const onCheckoutClick: FormEventHandler<HTMLFormElement> = e => {
        e.preventDefault();

        if (selectedPickupPoint) {
            dispatch(processOrderAction())
                .unwrap()
                .then(paymentUrl => {
                    window.location.replace(paymentUrl);
                })
                .catch(() => {
                    router.replace('/');
                });
        } else {
            window.alert('не выбран пункт выдачи!');
        }
    };

    return (
        <Column as="form" onSubmit={onCheckoutClick} height="100%" justifyContent="space-between">
            <Column height="100%" overflowY="auto" gap="2">
                <Header withBackArrow>Оформление заказа</Header>

                <Block>
                    <Row display="inline">
                        <Text size={14} weight={400}>
                            {`${selectedBasketItemsCount} ${pluralize(selectedBasketItemsCount, [
                                'товар',
                                'товара',
                                'товаров',
                            ])} на сумму `}
                        </Text>
                        <Text color="#F40C43" size={14} weight={600}>
                            {selectedBasketItemsCost} ₽
                        </Text>
                    </Row>
                </Block>
                <Block gap="4">
                    <Column gap="2">
                        <Text size={14} weight={600}>
                            Укажите адрес доставки
                        </Text>
                        <Text size={10} weight={400} color="#303234A3">
                            Пока мы работаем только в Самаре, поэтому выбор города не доступен
                        </Text>
                        <Select disabled value={0} options={[{id: 0, name: 'Самара'}]} />
                    </Column>
                    <Column gap="2">
                        <Text size={14} weight={600}>
                            <Text color="#4FDE38">Бесплатная</Text> доставка в пункт выдачи, можно забрать{' '}
                            {format(new Date(), 'dd MMMM ')}
                            (завтра)
                        </Text>

                        <Column gap="1" paddingX={3}>
                            <ul className={css.list}>
                                <li>
                                    <Text size={12} weight={400} color="#303234A3">
                                        Срок хранения заказа 5 дней
                                    </Text>
                                </li>
                                <li>
                                    <Text size={12} weight={400} color="#303234A3">
                                        Можно проверить и примерить
                                    </Text>
                                </li>
                                <li>
                                    <Text size={12} weight={400} color="#303234A3">
                                        Возврат товара быстро и без проблем
                                    </Text>
                                </li>
                            </ul>
                        </Column>
                    </Column>

                    {selectedPickupPoint && (
                        <Column gap={1}>
                            <Text weight={400} size={14}>
                                Пункт выдачи г. Самара, {selectedPickupPoint.address}
                            </Text>
                            <Text weight={400} size={12} color="#303234A3">
                                Хранение 5 дней, ежедневно с 10:00 до 21-00
                            </Text>
                        </Column>
                    )}

                    <Link href="/basket/checkout/pickup-points">
                        <Button variant={selectedPickupPoint ? 'normal' : 'outline'} size="m" width="full">
                            {selectedPickupPoint ? 'Изменить адрес' : 'Выбрать пункт выдачи'}
                        </Button>
                    </Link>
                </Block>

                <Block gap="4">
                    <Text size={14} weight={600}>
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
                        <Text size={12} weight={400} color="#303234A3">
                            Пришлем статус заказа по e-mail и в SMS
                        </Text>
                    </Column>
                </Block>

                <Summary />

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
