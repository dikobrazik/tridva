import {Separator} from '@/components/Separator';
import {Text} from '@/components/Text';
import {Block} from '@/components/layout/Block';
import {Column} from '@/components/layout/Column';
import {formatDate} from 'date-fns';
import Link from 'next/link';
import {Status} from '../Status';
import {CancelOrderButton} from './CancelOrderButton';
import {Order} from '@/types/orders';
import {OfferOrderBlock} from '@/components/OfferCard/OfferOrderBlock';

type Props = Order;

export const OrderItem = (order: Props) => {
    const address = order.pickupPoint.address;

    return (
        <Block gap={5}>
            <Column gap="1">
                <Text size={14} weight={500}>
                    Заказ от {formatDate(order.createdAt, 'd MMMM')}
                </Text>
                <Text size={12} weight={400} color="#303234A3">
                    Пункт выдачи: {order.pickupPoint.address}. Ежедневно 10:00 - 21:00
                </Text>
            </Column>

            {order.items.map(({offer, isGroupItem, status}) => (
                <>
                    <Link href={`/offers/${offer.id}`}>
                        <OfferOrderBlock isGroupItem={isGroupItem} offer={offer} />
                    </Link>
                    <Column gap={3}>
                        <Column gap={2} alignItems="flex-start">
                            <Text size={12} weight={500}>
                                Статус:
                            </Text>
                            <Status status={status} address={address} />
                        </Column>

                        <Column gap={1}>
                            <Text size={12} weight={500}>
                                Ожидаемая дата доставки: 12 февраля
                            </Text>
                            <Text size={12} weight={400} color="#303234A3">
                                Мы сообщим, когда товар можно будет забрать
                            </Text>
                        </Column>
                    </Column>

                    <Separator />
                </>
            ))}

            <CancelOrderButton orderId={order.id} />
        </Block>
    );
};
