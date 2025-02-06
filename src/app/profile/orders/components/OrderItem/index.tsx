import {OfferOrderBlock} from '@/components/OfferCard/OfferOrderBlock';
import {Separator} from '@/components/Separator';
import {Text} from '@/components/Text';
import {Block} from '@/components/layout/Block';
import {Column} from '@/components/layout/Column';
import {ORDER_STATUS_MAP} from '@/shared/constants/order-status';
import {Order} from '@/types/orders';
import {formatDate} from 'date-fns';
import Link from 'next/link';
import {StatusBadge} from '../StatusBadge';
import {CancelOrderButton} from './CancelOrderButton';
import {NotPaidBlock} from './NotPaidBlock';

type Props = Order;

export const OrderItem = (order: Props) => {
    const address = order.pickupPoint.address;

    const isOrderNotPaid = order.items.every(item => item.status === ORDER_STATUS_MAP.PAYMENT_ERROR);

    return (
        <Block gap={5}>
            <Column gap="1">
                <Text size={14} weight={500}>
                    Заказ №{order.id} от {formatDate(order.createdAt, 'd MMMM')}
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
                    {!isOrderNotPaid && (
                        <Column gap={3}>
                            <Column gap={2} alignItems="flex-start">
                                <Text size={12} weight={500}>
                                    Статус:
                                </Text>
                                <StatusBadge status={status} address={address} />
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
                    )}

                    <Separator />
                </>
            ))}

            {isOrderNotPaid && <NotPaidBlock {...order} />}

            {!isOrderNotPaid && <CancelOrderButton orderId={order.id} />}
        </Block>
    );
};
