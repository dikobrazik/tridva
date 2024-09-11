import {Offer} from '@/types/offers';
import {Column} from '../layout/Column';
import {Text} from '../Text';
import Image from 'next/image';
import css from './OfferCard.module.scss';
import {Row} from '../layout/Row';
import {Icon} from '../Icon';
import Link from 'next/link';
import {pluralize} from '@/shared/utils/pluralize';
import {getOfferPhoto} from '@/shared/photos';
import {addSpacesToNumber} from '@/shared/utils/numberWithSpaces';

export const OfferCard = (props: Offer) => {
    const {id, title, price, discount, rating, photos, reviewsCount} = props;

    const imageSrc = getOfferPhoto(photos, 280);

    const finalPrice = addSpacesToNumber(Math.ceil(discount ? (Number(price) * discount) / 100 : Number(price)));

    return (
        <Link href={`/offers/${id}`}>
            <Column gap={2}>
                <Image
                    width="150"
                    height="150"
                    className={css.image}
                    alt={`image for offer named ${title}`}
                    src={imageSrc}
                />

                <Column gap={2} paddingX={1}>
                    {discount ? (
                        <Row alignItems="center">
                            <Text size={16} weight={600}>
                                {finalPrice} ₽
                            </Text>
                            <Text color="#303234A3" decoration="line-through" size={12} weight={400}>
                                {Math.ceil(Number(price))} ₽
                            </Text>
                            <Text color="#F40C43" size={12} weight={400}>
                                -{discount}%
                            </Text>
                        </Row>
                    ) : (
                        <Text size={16} weight={600}>
                            {finalPrice} ₽
                        </Text>
                    )}

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
                            <Text size={10}>Купили 256 {pluralize(256, ['раз', 'раза', 'раз'])}</Text>
                        </Row>
                    </Column>
                </Column>
            </Column>
        </Link>
    );
};
