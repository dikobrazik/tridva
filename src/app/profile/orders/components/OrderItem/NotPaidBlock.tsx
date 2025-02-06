import {LinkButton} from '@/components/Button';
import {Icon} from '@/components/Icon';
import {LeftTime} from '@/components/LeftTime';
import {Text} from '@/components/Text';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import {MS_IN_HOUR} from '@/shared/constants/date';
import {ORDER_STATUS_MAP} from '@/shared/constants/order-status';
import {StatusBadge} from '../StatusBadge';
import {Order} from '@/types/orders';
import {calculatePrice} from '@/shared/utils/formatPrice';

const getOrderTotalAmount = (order: Order) =>
    order.items.reduce(
        (acc, item) => acc + calculatePrice(item.offer.price, item.isGroupItem ? item.offer.discount : undefined),
        0,
    );

export const NotPaidBlock = (order: Order) => {
    const address = order.pickupPoint.address;
    const orderTotalAmount = getOrderTotalAmount(order);

    return (
        <Column gap={3}>
            <Column gap={2} alignItems="flex-start">
                <Text size={12} weight={500}>
                    Статус:
                </Text>
                <StatusBadge status={ORDER_STATUS_MAP.PAYMENT_ERROR} address={address} />
            </Column>

            <Row gap={1}>
                <Icon name="alertTriangle" />

                <Column gap={1}>
                    <Text size={12} weight={500} color="#F4420C">
                        Оплатите заказ, чтобы мы начали его собирать
                    </Text>
                    <Text size={10} weight={400} color="#F4420C">
                        Заказ отменится через{' '}
                        <LeftTime amount={MS_IN_HOUR} format="mm:ss" createdAt={order.createdAt} />
                    </Text>
                </Column>
            </Row>

            <LinkButton size="m" href={`/api/orders/payment?orderId=${order.id}`} target="_blank">
                Оплатить {orderTotalAmount} ₽
            </LinkButton>
        </Column>
    );
};
