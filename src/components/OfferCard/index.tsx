import {Offer} from '@/types/offers';
import {Column} from '../layout/Column';
import {Text} from '../Text';
import Image from 'next/image';
import css from './OfferCard.module.scss';
import duck from './duck.png';
import {Row} from '../layout/Row';
import {Icon} from '../Icon';

export const OfferCard = (props: Offer) => {
    const {title, price, discount} = props;

    return (
        <Column gap={2}>
            <Image className={css.image} alt={`image for offer named ${title}`} src={duck} />

            {discount ? (
                <Row alignItems="center">
                    <Text size={16} weight={600}>
                        {Math.round((Number(price) * discount) / 100)} ₽
                    </Text>
                    <Text color="#303234A3" decoration="line-through" size={12} weight={400}>
                        {price} ₽
                    </Text>
                    <Text color="#F40C43" size={12} weight={400}>
                        -{discount}%
                    </Text>
                </Row>
            ) : (
                <Text size={16} weight={600}>
                    {price} ₽
                </Text>
            )}

            <Column gap={1}>
                <Text>{title}</Text>
                <Row gap={2} alignItems="center">
                    <Row gap={1} alignItems="center">
                        <Icon name="star" />
                        <Text size={10}>4.9</Text>
                    </Row>
                    <Row gap={1} alignItems="center">
                        <Icon name="message" />
                        <Text size={10}>123 отзыва</Text>
                    </Row>
                </Row>
                <Row justifyContent="space-between">
                    <Text size={10}>Купили 256 раз</Text>
                </Row>
            </Column>
        </Column>
    );
};
