import {Offer} from '@/types/offers';
import {Column} from '../layout/Column';
import {Text} from '../Text';
import Image from 'next/image';
import css from './OfferCard.module.scss';
import duck from './duck.png';

export const OfferCard = (props: Offer) => {
    const {title, cost} = props;

    return (
        <Column maxWidth="50%" gap={2} padding={4}>
            <Image className={css.image} alt={`image for offer named ${title}`} src={duck} />
            <Text size={16} weight={600}>
                {cost}
            </Text>
            <Text size={12}>{title}</Text>
        </Column>
    );
};
