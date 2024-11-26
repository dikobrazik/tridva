import {loadOrders} from '@/api';
import {Header} from '@/components/Header';
import ImageWithFallback from '@/components/Image';
import {Text} from '@/components/Text';
import {Block} from '@/components/layout/Block';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import {getFirstOfferPhoto} from '@/shared/photos';
import {formatPrice} from '@/shared/utils/formatPrice';
import {formatDate} from 'date-fns';
import css from './Orders.module.scss';
import {Icon} from '@/components/Icon';
import Link from 'next/link';
import {Separator} from '@/components/Separator';
import {Box} from '@/components/layout/Box';
import {CancelOrderButton} from './components';

const Status = () => {
    return (
        <Row className={css.status} gap={1}>
            <Text size={12} weight={500} color="#FFFFFF">
                Передается в доставку
            </Text>

            <Icon name="informationCircleWhite" />
        </Row>
    );
};

const NoOrders = () => (
    <Block>
        <Text align="center">У вас пока нет заказанных товаров</Text>
    </Block>
);

export default async function OrdersPage() {
    const orders = await loadOrders();

    return (
        <Column gap={2}>
            <Header withBackArrow>Доставки {orders.length}</Header>

            {orders.length === 0 ? <NoOrders /> : undefined}

            {orders.map(({id, order, offer}) => {
                return (
                    <Block key={id}>
                        <Column gap={5}>
                            <Column gap="1">
                                <Text size={12} weight={500}>
                                    Заказ от {formatDate(order.createdAt, 'd MMMM')}
                                </Text>
                                <Text size={10} weight={400} color="#303234A3">
                                    Пункт выдачи: {order.pickupPoint.address}. Ежедневно 10:00 - 21:00
                                </Text>
                            </Column>

                            <Link href={`/offers/${offer.id}`}>
                                <Row gap={3}>
                                    <ImageWithFallback
                                        width="100"
                                        height="100"
                                        priority={false}
                                        className={css.image}
                                        alt={`image for offer named ${offer.title}`}
                                        src={getFirstOfferPhoto(offer.photos, 280)}
                                        fallbackSrc={getFirstOfferPhoto(offer.photos, 400) as string}
                                    />

                                    <Column paddingY={2} justifyContent="space-between">
                                        <Column gap={1}>
                                            <Text color="#F40C43" size={10} weight={600}>
                                                {formatPrice(offer.price, offer.discount)}&nbsp;₽
                                            </Text>
                                            <Text size={10} weight={400}>
                                                {offer.title}
                                            </Text>
                                        </Column>

                                        <Text size={10} weight={600}>
                                            Итого:&nbsp;{formatPrice(offer.price, offer.discount)}&nbsp;₽
                                        </Text>
                                    </Column>
                                </Row>
                            </Link>

                            <Column gap={3}>
                                <Column gap={2} alignItems="flex-start">
                                    <Text size={10} weight={500}>
                                        Статус:
                                    </Text>
                                    <Status />
                                </Column>

                                <Column gap={1}>
                                    <Text size={10} weight={500}>
                                        Ожидаемая дата доставки: 12 фефраля
                                    </Text>
                                    <Text size={10} weight={400} color="#303234A3">
                                        Мы сообщим, когда товар можно будет забрать
                                    </Text>
                                </Column>
                            </Column>

                            <Separator />

                            <CancelOrderButton orderId={order.id} offerId={offer.id} />
                        </Column>
                    </Block>
                );
            })}
        </Column>
    );
}
