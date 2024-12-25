import ImageWithFallback from '@/components/Image';
import {Separator} from '@/components/Separator';
import {Text} from '@/components/Text';
import {Block} from '@/components/layout/Block';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import {getFirstOfferPhoto} from '@/shared/photos';
import {formatPrice} from '@/shared/utils/formatPrice';
import {formatDate} from 'date-fns';
import Link from 'next/link';
import css from './OrderItem.module.scss';
import {Status} from '../Status';
import {CancelOrderButton} from './CancelOrderButton';
import {Order} from '@/types/orders';

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

            {order.items.map(({offer, statusText}) => (
                <>
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
                                    <Text color="#F40C43" size={12} weight={600}>
                                        {formatPrice(offer.price, offer.discount)}&nbsp;₽
                                    </Text>
                                    <Text size={12} weight={400}>
                                        {offer.title}
                                    </Text>
                                </Column>

                                <Text size={12} weight={600}>
                                    Итого:&nbsp;{formatPrice(offer.price, offer.discount)}&nbsp;₽
                                </Text>
                            </Column>
                        </Row>
                    </Link>

                    <Column gap={3}>
                        <Column gap={2} alignItems="flex-start">
                            <Text size={12} weight={500}>
                                Статус:
                            </Text>
                            <Status statusText={statusText} address={address} />
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
