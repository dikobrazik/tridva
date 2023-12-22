import {Offer} from '@/types/offers';
import {Column} from '../layout/Column';
import {Text} from '../Text';
import Image from 'next/image';
import css from './OfferCard.module.scss';
import duck from './duck.png';
import {Row} from '../layout/Row';
import {Icon} from '../Icon';

export const OfferCard = (props: Offer) => {
    const {title, cost} = props;

    return (
        <Column flex="1 0 160px" gap={2} padding={4}>
            <Image className={css.image} alt={`image for offer named ${title}`} src={duck} />
            <Text size={16} weight={600}>
                {cost} ₽
            </Text>
            <Text>{title}</Text>
            <Row gap={2} alignItems="center">
                <Row gap={1}>
                    <Icon name="star" />
                    <Text size={10}>4.9</Text>
                </Row>
                <Row gap={1}>
                    <Icon name="message" />
                    <Text size={10}>123 отзыва</Text>
                </Row>
            </Row>
            <Row justifyContent="space-between">
                <Text size={10}>Купили 256 раз</Text>
            </Row>
        </Column>
    );
};
