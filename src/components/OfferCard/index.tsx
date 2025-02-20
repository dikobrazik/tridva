import {Offer} from '@/types/offers';
import {Column} from '../layout/Column';
import {Text} from '../Text';
import css from './OfferCard.module.scss';
import {Row} from '../layout/Row';
import {Icon} from '../Icon';
import Link from 'next/link';
import {pluralize} from '@/shared/utils/pluralize';
import {getFirstOfferPhoto} from '@/shared/photos';
import {formatPrice} from '@/shared/utils/formatPrice';
import ImageWithFallback from '../Image';
import {memo} from 'react';
import {ProfileAvatar} from '../Avatar';

export const OfferCard = memo(
    (props: Offer & {priority?: boolean}) => {
        const {
            id,
            title,
            priority = false,
            price,
            ordersCount,
            discount,
            rating,
            photos,
            reviewsCount,
            groupsOwnersIds,
        } = props;

        const imageSrc = getFirstOfferPhoto(photos, 280);
        const fallbackImageSrc = typeof imageSrc === 'string' ? imageSrc.replace('280.jpg', '140.jpg') : undefined;

        const finalPrice = formatPrice(price, discount);
        const isWidePrice = finalPrice.length > 5;

        return (
            <Link href={`/offers/${id}`}>
                <Column gap={2} maxHeight={296}>
                    <ImageWithFallback
                        width="150"
                        height="150"
                        priority={priority}
                        className={css.image}
                        alt={`image for offer named ${title}`}
                        src={imageSrc}
                        fallbackSrc={fallbackImageSrc}
                    />

                    <Column gap={2} paddingX={1}>
                        <Row gap={2} alignItems="center">
                            <Text color="#F40C43" size={isWidePrice ? 14 : 16} weight={600}>
                                {finalPrice} ₽
                            </Text>
                            {Boolean(discount) && (
                                <Row gap={1}>
                                    <Text
                                        color="#303234A3"
                                        decoration="line-through"
                                        size={isWidePrice ? 10 : 12}
                                        weight={400}
                                    >
                                        {Math.ceil(Number(price))} ₽
                                    </Text>
                                    <Text color="#F40C43" size={isWidePrice ? 10 : 12} weight={400}>
                                        -{discount}%
                                    </Text>
                                </Row>
                            )}
                        </Row>

                        <Column gap={1}>
                            <Text className={css.title}>{title}</Text>
                            <Row gap={2} alignItems="center">
                                {rating && (
                                    <Row gap={1} alignItems="center">
                                        <Icon name="star" />
                                        <Text size={10}>{rating}</Text>
                                    </Row>
                                )}
                                <Row gap={1} alignItems="center">
                                    <Icon name="message" />
                                    <Text size={10}>
                                        {reviewsCount} {pluralize(reviewsCount, ['отзыв', 'отзыва', 'отзывов'])}
                                    </Text>
                                </Row>
                            </Row>
                            <Row justifyContent="space-between">
                                <Text size={10} lineHeight={14}>
                                    Купили {ordersCount} {pluralize(ordersCount, ['раз', 'раза', 'раз'])}
                                </Text>

                                <Row className={css.groupsOwnersAvatarsRow}>
                                    {groupsOwnersIds?.map(id => (
                                        <ProfileAvatar
                                            className={css.avatarContainer}
                                            id={id}
                                            key={id}
                                            width={12}
                                            height={12}
                                        />
                                    ))}
                                </Row>
                            </Row>
                        </Column>
                    </Column>
                </Column>
            </Link>
        );
    },
    (prevProps, nextProps) => prevProps.id === nextProps.id,
);

OfferCard.displayName = 'OfferCard';
